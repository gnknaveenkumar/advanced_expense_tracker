import { useContext, useState } from "react";
import Charts from "../components/Charts";
import {
  chartComparisonParameter,
  getTransactionSummaryByTypes,
} from "../utility/utils";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
import _ from "lodash";

const Statictics = () => {
  const {
    transactions,
    selectedMonth,
    setSelectedMonth,
    months,
    filteredTransactions,
  } = useContext(expenseTrackerDataContext);

  const [chartComparisonStr, setChartComparisonStr] = useState<string>(
    chartComparisonParameter[0]
  );

  // const { chartData, incomeTotal, expenseTotal } = getTransactionSummaryByType(
  //   _.cloneDeep(transactions)
  // );
  const { chartData = [] } =
    getTransactionSummaryByTypes(
      _.cloneDeep(filteredTransactions),
      chartComparisonStr
    ) || {};

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedMonth(selected);
  };

  return (
    <div className="p-4 m-auto ">
      <h1 className="text-center text-2xl font-bold mb-4">
        Transaction Overview
      </h1>
      <div className="flex justify-between">
        {/* <label className="font-bold">Filter by Month:</label> */}
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className=" h-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {/* <option value="">All Months</option> */}
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={chartComparisonStr}
          onChange={(e) => {
            setChartComparisonStr(e.target.value);
          }}
          className=" h-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {/* <option value="">All Months</option> */}
          {chartComparisonParameter.map((parameter, index) => (
            <option key={index} value={parameter}>
              {parameter}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-10">
        {/* <Charts data={chartData} chartType="pie" title={chartComparisonStr} /> */}
        <Charts data={chartData} chartType="donut" title={chartComparisonStr} />
      </div>
    </div>
  );
};

export default Statictics;
