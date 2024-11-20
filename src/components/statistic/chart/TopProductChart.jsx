import { StatisticChart } from "./StatisticChart";
import { useState, useEffect } from "react";
import { StatisticsService } from "@/services";
import { Tooltip } from "./Tooltip";

const num = 6;

const truncateLabel = (value, length = 16) => {
    return typeof value === 'string' && value.length >= length + 4 
        ?  value.slice(0, length) + "..." : value;
};

const createColumnChartConfig = (categories = [], data = []) => ({
        type: "bar",
        height: 320,
        series: [
            {
            name: "Quantity",
            data,
            },
        ],
        options: {
            chart: {
            toolbar: {
                show: false,
                },
            },
            colors: "#388e3c",
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                bar: {
                    columnWidth: "12%",
                    borderRadius: 5,
                },
            },
            xaxis: {
                axisTicks: {
                    show: true,
                },
                labels:{
                    formatter: (value) => truncateLabel(value),
                },
                categories,
            },
            tooltip: {
                enabled: true,
                custom: Tooltip,
            },
        },
});

export function TopProductChart() {
    const [chart, setChart] = useState(createColumnChartConfig);

    useEffect(() => {
        const getTopProducts = async () => {
          const statistics = await StatisticsService.getTopProducts(num)
          const products = statistics.map(item => item.title)
          const quantities = statistics.map(item => item.totalQuantity)
    
          setChart(createColumnChartConfig(products, quantities));
        };

        getTopProducts();
    }, [])

    return (
        <StatisticChart
          chart={chart}
          title="Top Products"
        />
    );
}
