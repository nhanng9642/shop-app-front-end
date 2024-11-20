import { MonthlyRevenueChart } from "./MonthlyRevenueChart";
import { TopProductChart } from "./TopProductChart";

export function StatisticCharts() {
    return (
        <div className="">
            <TopProductChart />
            <MonthlyRevenueChart />
        </div>
    );
}