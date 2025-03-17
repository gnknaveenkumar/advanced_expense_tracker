import { Transaction } from "../common/types";

const today = new Date();

export const getFormattedDateAndDay = (): string => {
  const day = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();
  const date = today.getDate().toString().padStart(2, "0");
  return `${date}  ${day} `;
};

export const getFormattedMonth = (): string => {
  const day = today;
  const month = today
    .toLocaleDateString("en-US", { month: "long" })
    .toUpperCase();

  return month;
};

export const getTransactionSummaryByType = (transactions: Transaction[]) => {
  console.log(transactions);
  const { incomeTotal, expenseTotal } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.isIncome) {
        acc.incomeTotal += transaction.money;
      } else {
        acc.expenseTotal += transaction.money;
      }
      return acc;
    },
    { incomeTotal: 0, expenseTotal: 0 }
  );

  console.log("incomeTotal", incomeTotal);
  console.log("expensetodatal,", expenseTotal);

  return {
    incomeTotal,
    expenseTotal,
    chartData: [
      { name: "Income", value: incomeTotal },
      { name: "Expense", value: expenseTotal },
    ],
  };
};
