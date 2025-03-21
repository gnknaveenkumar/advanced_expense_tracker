import React from "react";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";

interface BarChartProps {
  data?: number[];
  labels?: string[];
}
const BarChart: React.FC<BarChartProps> = ({ data, labels }) => {
  const option: EChartsOption = {
    grid: {
      left: 0, // Space for sticky Y-axis labels
      right: "10px",
      bottom: "10px",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: labels,
      axisLabel: {
        interval: 0, // Show all labels
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Datas",
        data: data,
        type: "bar",
        barWidth: 20,
        itemStyle: {
          color: "#4CAF50", // Custom green color
        },
      },
    ],
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Weekly Sales Report</h2>
      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
};

export default BarChart;
