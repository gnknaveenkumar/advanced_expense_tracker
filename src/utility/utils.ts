import { Transaction } from "../common/types";

const today = new Date();

export const getFormattedDateAndDay = (): string => {
  const day = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();
  const date = today.getDate().toString().padStart(2, "0");
  return `${date},  ${day} `;
};

export const chartComparisonParameter = [
  "Income-Expense",
  "Income's Category",
  "Expense's Category",
  "All Category",
];

export const getFormattedMonth = (): string => {
  const day = today;
  const month = today
    .toLocaleDateString("en-US", { month: "long" })
    .toUpperCase();

  return month;
};

const getChartData = (data: any) => {
  const chartData = Object.keys(data).map((k) => ({
    name: k,
    value: data[k],
  }));

  return chartData;
};

export const getTransactionSummaryByTypes = (
  transactions: Transaction[],
  comparisonStr: string
) => {
  if (comparisonStr === chartComparisonParameter[0]) {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.isIncome) {
        incomeTotal += transaction.money;
      } else {
        expenseTotal += transaction.money;
      }
    });

    return {
      chartData: [
        { name: "Income", value: incomeTotal },
        { name: "Expense", value: expenseTotal },
      ],
    };
  } else if (comparisonStr === chartComparisonParameter[1]) {
    const incomeCategories: any = {};
    const incomeTransactions = transactions.filter((trans) => trans.isIncome);
    incomeTransactions.forEach((tran) => {
      if (incomeCategories.hasOwnProperty(tran.category)) {
        incomeCategories[tran.category] += tran.money;
      } else {
        incomeCategories[tran.category] = tran.money;
      }
    });

    const chartData = getChartData(incomeCategories);
    return { chartData };
  } else if (comparisonStr === chartComparisonParameter[2]) {
    const expenseCategories: any = {};
    const incomeTransactions = transactions.filter((trans) => !trans.isIncome);
    incomeTransactions.forEach((tran) => {
      if (expenseCategories.hasOwnProperty(tran.category)) {
        expenseCategories[tran.category] += tran.money;
      } else {
        expenseCategories[tran.category] = tran.money;
      }
    });

    const chartData = getChartData(expenseCategories);
    return { chartData };
  } else {
    const allCategories: any = {};
    const transactionsCopy = [...transactions];
    transactionsCopy.forEach((tran) => {
      if (allCategories.hasOwnProperty(tran.category)) {
        allCategories[tran.category] += tran.money;
      } else {
        allCategories[tran.category] = tran.money;
      }
    });

    const chartData = getChartData(allCategories);
    return { chartData };
  }
};

// export const getTransactionSummaryByType = (
//   transactions: Transaction[],
//   comparisonStr: string
// ) => {
//   const { incomeTotal, expenseTotal } = transactions.reduce(
//     (acc, transaction) => {
//       if (transaction.isIncome) {
//         acc.incomeTotal += transaction.money;
//       } else {
//         acc.expenseTotal += transaction.money;
//       }
//       return acc;
//     },
//     { incomeTotal: 0, expenseTotal: 0 }
//   );

//   return {
//     incomeTotal,
//     expenseTotal,
//     chartData: [
//       { name: "Income", value: incomeTotal },
//       { name: "Expense", value: expenseTotal },
//     ],
//   };
// };

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const monthDictionary: any = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export const getMonthAndYear = (date: string) => {
  const dateArray = date.toString().split("-");
  const monthAndYear = monthDictionary[dateArray[1]] + "-" + dateArray[0];
  return monthAndYear;
};

export const getFilteredTransactionsByMonth = (transactions: Transaction[]) => {
  const months = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((trans) => getMonthAndYear(trans.date));

  return Array.from(new Set(months));
};
