export interface Transaction {
  id: number;
  money: number;
  category: string;
  description: string;
  isIncome: boolean;
  date: string;
}
