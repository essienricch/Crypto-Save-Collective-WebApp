# CryptoSave Collective - Play-to-Earn Savings Group Web App

A modern React.js web application for managing a cryptocurrency savings group where students can collectively invest in Play-to-Earn blockchain games with guaranteed returns.

## 🚀 Project Overview

CryptoSave Collective is a savings group management system that allows up to 12 students to pool their resources for blockchain gaming investments. The application features three investment tiers with different weekly interest rates and provides a comprehensive dashboard for tracking savings, interest accumulation, and member management.

### Key Features

- **Student Registration**: Easy member onboarding with tier selection
- **Three Investment Tiers**: 
  - Tier 1: ₦10,000 (5% weekly interest)
  - Tier 2: ₦20,000 (10% weekly interest)
  - Tier 3: ₦30,000 (20% weekly interest)
- **Real-time Dashboard**: Live tracking of total savings and individual contributions
- **Input Validation**: Ensures correct amounts for selected tiers
- **Weekly Simulation**: Progress tracking with automated interest calculations
- **Withdrawal Management**: Member removal with automatic recalculation
- **Responsive Design**: Mobile-friendly interface with modern UI/UX

## 🛠 Technology Stack

- **Frontend**: React.js (Functional Components with Hooks)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useState Hook
- **Responsive Design**: CSS Grid and Flexbox

## 📦 Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Git

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/essienricch/cryptosave-collective.git
   cd cryptosave-collective
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` to view the application.

## 🎯 How to Use the Application

### 1. Adding Members

1. Click the **"Add Member"** button on the main dashboard
2. Fill in the member registration form:
   - **Member Name**: Enter the student's full name
   - **Savings Tier**: Select from three available tiers
   - **Amount**: Enter the exact amount for the selected tier
3. The system validates that the amount matches the tier requirement
4. Click **"Add Member"** to complete registration

### 2. Viewing Dashboard

The main dashboard displays:
- **Total Savings**: Combined amount from all members
- **Total Interest**: Accumulated interest across all members
- **Active Members**: Current member count (max 12)
- **Members Table**: Detailed breakdown of each member's contribution and earnings

### 3. Weekly Progress Simulation

- Click **"Simulate Week Progress"** to advance one week
- Interest is automatically calculated and added to each member's balance
- Week counter updates to track progression

### 4. Member Withdrawal

- Click the **"Withdraw"** button next to any member
- Member is immediately removed from the group
- All totals and calculations update automatically
- Opens up space for a new member to join

### 5. Tier Information

View the three investment tiers at the bottom of the page:
- **Tier 1 - Starter**: ₦10,000 investment, 5% weekly interest
- **Tier 2 - Growth**: ₦20,000 investment, 10% weekly interest  
- **Tier 3 - Premium**: ₦30,000 investment, 20% weekly interest

## 🧪 Testing

### Manual Testing Checklist

- [ ] Member registration with all three tiers
- [ ] Input validation for incorrect amounts
- [ ] Maximum member limit (12 members)
- [ ] Weekly progress simulation
- [ ] Member withdrawal functionality
- [ ] Dashboard calculations accuracy
- [ ] Responsive design on mobile devices


## 📊 Data Management

The application uses React's built-in state management:
- **No External Database**: All data stored in component state
- **Session-Based**: Data resets on page refresh
- **Real-time Updates**: Immediate UI updates on data changes

## 🔒 Security Considerations

- Input validation prevents invalid data entry
- No sensitive data stored in local storage
- Client-side only validation (add server-side for production) 

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature-name'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added responsive design improvements
- **v1.2.0** - Enhanced validation and error handling
