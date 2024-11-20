import  { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    CardFooter,
} from '@material-tailwind/react'

import { AccountService } from '@/services'
import { Action, MyCardFooter } from '@/components'

const TABLE_HEAD = ["#", "User ID", "Balance", "Action"];
const ITEMS_PER_PAGE = 7
export function AccountTable() {
    const [tableRows, setTableRows] = useState([]);
    const [forceUpdateFlag, setForceUpdateFlag] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const [pageLimit, setPageLimit] = useState(0);
    const page = +searchParams.get("page") || 1;

    const manualRerender = () => {
        setForceUpdateFlag(prevFlag => !prevFlag);
    };

     useEffect(() => {
        const fetchTableRows = async () => {
            if (page < 1) setSearchParams({ ...searchParams, page: 1 })

            const data = await AccountService.getAccounts(page);
            if (page > data.totalPages)
                setSearchParams({ ...searchParams, page: data.totalPages })
            setPageLimit(data.totalPages)
            setTableRows(data.data);
        }

        fetchTableRows();
    }, [page, forceUpdateFlag, pageLimit, setSearchParams, searchParams])


    return (
        <Card className="h-full w-full mt-1">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Account
                        </Typography>
                    </div>
                </div>
            </CardHeader>

            <CardBody className="px-0 -mt-2 ">
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map(
                            (
                                {
                                    _id,
                                    userId,
                                    balance,
                                },
                                index,
                            ) => {
                                const isLast = index === tableRows.length - 1;
                                const classes = isLast
                                    ? "p-3"
                                    : "p-3 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {ITEMS_PER_PAGE * (page - 1)+ index + 1}
                                                </Typography>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {userId}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes} >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {balance}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Action route={`/admin/account/`}
                                                _id={_id}
                                                manualRerender={manualRerender}
                                                deleteRow={AccountService.deleteAccount}
                                            />
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>

            <CardFooter className='mx-auto -mt-4'>
                <MyCardFooter pageLimit={pageLimit} />
            </CardFooter>
        </Card>
    );
}
