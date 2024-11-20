/* eslint-disable react/prop-types */
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import { useState, useEffect } from "react";

export function StatisticCard({ icon, title, getData }) {
    const [data, setData] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setData(data);
        };

        fetchData();
    });

    return (
        <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
                variant="gradient"
                floated={false}
                shadow={false}
                className="absolute grid h-12 w-12 place-items-center bg-black text-white p-2.5"
            >
                    {icon}
            </CardHeader>
            <CardBody className="p-4 text-right">
                <Typography variant="small" className="font-normal text-black">
                    {title}
                </Typography>
                <Typography variant="h4" color="blue-gray">
                    {data}
                </Typography>
            </CardBody>
        </Card>
    );
}


export default StatisticCard;
