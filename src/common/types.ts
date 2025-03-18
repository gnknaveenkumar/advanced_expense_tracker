export interface Transaction {
  id: number;
  money: number;
  category: string;
  description: string;
  isIncome: boolean;
  date: number;
}

export type TransactionType = {
  id: number | null;
  action: "EDIT" | "DELETE" | null;
};
