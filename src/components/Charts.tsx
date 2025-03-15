import React from "react";
import ReactECharts from "echarts-for-react";

interface ChartData {
  name: string;
  value: number;
}

interface Props {
  data: ChartData[];
  chartType: "pie" | "donut";
  title?: string;
}
const Charts: React.FC<Props> = ({ data, chartType, title }) => {
  const isDonut = chartType === "donut";

  const options: any = {
    title: {
      text: title || "Chart",
      left: "center",
      top: "5%", // Adds space above
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
      padding: [10, 0, 0, 0], // Adds more spacing below the title
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: ${c} ({d}%)",
    },
    legend: {
      bottom: "0%", // Moves legend to the bottom
      orient: "horizontal",
      itemGap: 20,
    },
    series: [
      {
        name: "Transactions",
        type: "pie",
        radius: isDonut ? ["45%", "70%"] : ["0%", "70%"], // Adjusted radius for better spacing
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: data,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: 300 }} />;
};

export default Charts;
