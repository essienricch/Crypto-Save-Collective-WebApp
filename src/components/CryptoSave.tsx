import React, { useState } from 'react';
import { Users, Wallet, TrendingUp, UserMinus, Plus, DollarSign } from 'lucide-react';
import { Errors } from '../interface/Errors';
import { Member } from '../interface/Member';
import { tiers } from '../tiers';

const CryptoSave = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [newMember, setNewMember] = useState({
    name: '',
    tier: '',
    amount: ''
  });

  
  const [errors, setErrors] = useState<Errors>({});
  const [showAddForm, setShowAddForm] = useState(false);



  const validateInput = () => {
    const newErrors: Errors = {};
  
    
    if (!newMember.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!newMember.tier) {
      newErrors.tier = 'Please select a tier';
    }
    
    if (!newMember.amount) {
      newErrors.amount = 'Amount is required';
    } else {
      const amount = parseInt(newMember.amount);
      const expectedAmount = newMember.tier ? tiers[newMember.tier].amount : 0;
      
      if (amount !== expectedAmount) {
        newErrors.amount = `${tiers[newMember.tier]?.name} requires exactly ₦${expectedAmount.toLocaleString()}`;
      }
    }
    
    if (members.length >= 12) {
      newErrors.general = 'Maximum of 12 members allowed';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addMember = () => {
    if (!validateInput()) return;
    
    const member = {
      id: Date.now(),
      name: newMember.name.trim(),
      tier: parseInt(newMember.tier),
      initialAmount: parseInt(newMember.amount),
      currentAmount: parseInt(newMember.amount),
      weeklyInterest: parseInt(newMember.amount) * tiers[newMember.tier].interest,
      joinedWeek: currentWeek
    };
    
    setMembers([...members, member]);
    setNewMember({ name: '', tier: '', amount: '' });
    setErrors({});
    setShowAddForm(false);
  };

  const removeMember = (memberId) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  const simulateWeeklyProgress = () => {
    const updatedMembers = members.map(member => ({
      ...member,
      currentAmount: member.currentAmount + member.weeklyInterest
    }));
    
    setMembers(updatedMembers);
    setCurrentWeek(currentWeek + 1);
  };

  const getTotalSavings = () => {
    return members.reduce((total, member) => total + member.currentAmount, 0);
  };

  const getTotalInitialSavings = () => {
    return members.reduce((total, member) => total + member.initialAmount, 0);
  };

  const getTotalInterest = () => {
    return getTotalSavings() - getTotalInitialSavings();
  };

  const handleTierChange = (tier) => {
    setNewMember({
      ...newMember,
      tier,
      amount: tier ? tiers[tier].amount.toString() : ''
    });
    setErrors({ ...errors, tier: '', amount: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            CryptoSave Collective
          </h1>
          <p className="text-xl text-gray-300 mb-2">Play-to-Earn Blockchain Savings Group</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <TrendingUp size={16} />
              20% Game Returns
            </span>
            <span>•</span>
            <span>Week {currentWeek}</span>
            <span>•</span>
            <span>{members.length}/12 Members</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="text-green-400" size={24} />
              <h3 className="text-lg font-semibold">Total Savings</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">₦{getTotalSavings().toLocaleString()}</p>
            <p className="text-sm text-gray-400">Initial: ₦{getTotalInitialSavings().toLocaleString()}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-yellow-400" size={24} />
              <h3 className="text-lg font-semibold">Total Interest</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">₦{getTotalInterest().toLocaleString()}</p>
            <p className="text-sm text-gray-400">Accumulated so far</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-blue-400" size={24} />
              <h3 className="text-lg font-semibold">Active Members</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{members.length}</p>
            <p className="text-sm text-gray-400">Out of 12 maximum</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            disabled={members.length >= 12}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            <Plus size={20} />
            Add Member
          </button>
          
          <button
            onClick={simulateWeeklyProgress}
            disabled={members.length === 0}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            <TrendingUp size={20} />
            Simulate Week Progress
          </button>
        </div>

        {/* Add Member Form */}
        {showAddForm && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-xl font-bold mb-4">Add New Member</h3>
            
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4">
                <p className="text-red-300">{errors.general}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Member Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
                  placeholder="Enter member name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Savings Tier</label>
                <select
                  value={newMember.tier}
                  onChange={(e) => handleTierChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:border-blue-400 focus:outline-none text-white"
                >
                  <option value="">Select Tier</option>
                  <option value="1">Tier 1 - ₦10,000 (5% weekly)</option>
                  <option value="2">Tier 2 - ₦20,000 (10% weekly)</option>
                  <option value="3">Tier 3 - ₦30,000 (20% weekly)</option>
                </select>
                {errors.tier && <p className="text-red-400 text-sm mt-1">{errors.tier}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Amount (₦)</label>
                <input
                  type="number"
                  value={newMember.amount}
                  onChange={(e) => setNewMember({ ...newMember, amount: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
                  placeholder="Enter amount"
                />
                {errors.amount && <p className="text-red-400 text-sm mt-1">{errors.amount}</p>}
              </div>
            </div>
            
            {newMember.tier && (
              <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-3 mb-4">
                <p className="text-blue-300">
                  Weekly Interest: ₦{(tiers[newMember.tier].amount * tiers[newMember.tier].interest).toLocaleString()}
                  <br />
                  Total after 1 week: ₦{(tiers[newMember.tier].amount * (1 + tiers[newMember.tier].interest)).toLocaleString()}
                </p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={addMember}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Add Member
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewMember({ name: '', tier: '', amount: '' });
                  setErrors({});
                }}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Members Dashboard */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <h3 className="text-xl font-bold mb-4">Members Dashboard</h3>
          
          {members.length === 0 ? (
            <div className="text-center py-8">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-400">No members yet. Add the first member to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-4">Name</th>
                    <th className="text-left py-2 px-4">Tier</th>
                    <th className="text-left py-2 px-4">Initial Amount</th>
                    <th className="text-left py-2 px-4">Current Amount</th>
                    <th className="text-left py-2 px-4">Weekly Interest</th>
                    <th className="text-left py-2 px-4">Total Interest</th>
                    <th className="text-left py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4 font-medium">{member.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.tier === 1 ? 'bg-green-500/20 text-green-400' :
                          member.tier === 2 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          Tier {member.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4">₦{member.initialAmount.toLocaleString()}</td>
                      <td className="py-3 px-4 font-semibold text-green-400">₦{member.currentAmount.toLocaleString()}</td>
                      <td className="py-3 px-4">₦{member.weeklyInterest.toLocaleString()}</td>
                      <td className="py-3 px-4 text-yellow-400">₦{(member.currentAmount - member.initialAmount).toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => removeMember(member.id)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          <UserMinus size={14} />
                          Withdraw
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tier Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(tiers).map(([tier, info]) => (
            <div key={tier} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold mb-2">{info.name}</h4>
              <p className="text-sm text-gray-400 mb-1">Investment: ₦{info.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Weekly Interest: {(info.interest * 100)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoSave;