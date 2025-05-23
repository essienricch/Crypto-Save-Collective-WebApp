export interface Member {
    id: number;
    name: string;
    tier: number;
    initialAmount: number;
    currentAmount: number;
    weeklyInterest: number;
    joinedWeek: number;
  }