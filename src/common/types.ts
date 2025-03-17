export interface Transaction {
  id: number;
  money: number;
  category: string;
  description: string;
  isIncome: boolean;
  date: string;
}

export type TransactionType = {
  id: number | null;
  action: "EDIT" | "DELETE" | null;
};
