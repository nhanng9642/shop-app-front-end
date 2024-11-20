import { StatisticChart } from "./StatisticChart";
import { useState, useEffect } from "react";
import { StatisticsService } from "@/services";

const num = 6;

const createColumnChartConfig = (categories = [], data = []) => ({
    type: "line",
    height: 320,
    series: [
      {
        name: "Sales",
        data,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        categories,
      },
    },
  });

export function MonthlyRevenueChart() {
    const [chart, setChart] = useState(createColumnChartConfig);

    useEffect(() => {
        const getMonthlyRevenue = async () => {
            const statistics = await StatisticsService.getMonthlyRevenue(num)
            const milestones = statistics.map(item => item.month + '/' + item.year)
            const revenues = statistics.map(item => item.total.toFixed(2))
    
          setChart(createColumnChartConfig(milestones, revenues));
        };

        getMonthlyRevenue();
    }, [])

    return (
        <StatisticChart
          chart={chart}
          title="Monthly Revenue"
        />
    );
}
