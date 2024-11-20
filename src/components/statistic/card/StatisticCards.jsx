import {
    CurrencyDollarIcon,
    BookOpenIcon,
    UserIcon,
    DocumentTextIcon
  } from "@heroicons/react/24/solid";

import { StatisticsService } from "@/services";
import { StatisticCard } from "./StatisticCard";

const { getTotalUsers, getTotalProducts, getTotalOrders, getTotalRevenue } = StatisticsService;

const stats = [
    {
        icon: <UserIcon />,
        title: "Total Users",
        getData: getTotalUsers,
    },

    {
        icon: <BookOpenIcon />,
        title: "Total Orders",
        getData: getTotalOrders,
    },

    {
        icon: <DocumentTextIcon />,
        title: "Total Products",
        getData: getTotalProducts,
    },

    {
        icon: <CurrencyDollarIcon />,
        title: "Total Revenue",
        getData: getTotalRevenue,
    },
]

export function StatisticCards() {
    return (
        <div className="mb-12 mt-4 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
                <StatisticCard key={index} {...stat} />
            ))}
        </div>
    );
}
