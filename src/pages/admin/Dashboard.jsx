import { StatisticCards, StatisticCharts, TableTopBestSeller } from '@/components'
import { useState, useEffect } from 'react';
import { StatisticsService } from '@/services';

const monthlyRevenue = {
  type: "line",
  height: 320,
  series: [
    {
      name: "Sales",
      data: [],
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
      categories: [],
    },
  },
};

export default function Dashboard() {
  const [monthlyRevenueOptionChart, setMonthlyRevenueOptionChart] = useState(monthlyRevenue)

  // Get data for charts
  useEffect(() => {
    const getMonthlyRevenue = async () => {
        const statistics = await StatisticsService.getMonthlyRevenue()
        const categories = statistics.map(item => item.month + '/' + item.year)
        const revenue = statistics.map(item => item.total.toFixed(2))
        
        setMonthlyRevenueOptionChart({
            ...monthlyRevenueOptionChart,
            series: [{ data: revenue }],
            options: {
            ...monthlyRevenueOptionChart.options,
            xaxis: {
                ...monthlyRevenueOptionChart.options.xaxis,
                categories: categories
            }
            }
        })
    }

    getMonthlyRevenue()
  }, [])

  return (
    <>
        <StatisticCards />

        <StatisticCharts />
      
        <TableTopBestSeller />
    </>
  )
}

export { Dashboard }