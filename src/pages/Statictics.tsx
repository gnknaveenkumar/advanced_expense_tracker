import { useContext } from "react";
import Charts from "../components/Charts";
import { getTransactionSummaryByType } from "../utility/utils";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
import _ from "lodash";

const Statictics = () => {
  const { transactions } = useContext(expenseTrackerDataContext);
  // const transactions = [
  //   { id: 1, type: "income", amount: 1000 },
  //   { id: 2, type: "expense", amount: 300 },
  //   { id: 3, type: "income", amount: 500 },
  //   { id: 4, type: "expense", amount: 200 },
  // ];

  const { chartData, incomeTotal, expenseTotal } = getTransactionSummaryByType(
    _.cloneDeep(transactions)
  );
  console.log(transactions);
  return (
    <div className="p-4 m-auto ">
      <h1 className="text-center text-2xl font-bold mb-4">
        Transaction Overview
      </h1>
      <div className="mt-10">
        <Charts data={chartData} chartType="pie" title="" />
        {/* <Charts
          data={chartData}
          chartType="donut"
          title="Transaction Breakdown (Donut)"
        /> */}
      </div>
    </div>
  );
};

export default Statictics;
