/* eslint-disable react/prop-types */
import {
    Card,
    CardBody,
} from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

import {  MyCardFooter, MyCardHeader, TableBody, TableHeader } from '@/components';

export function Table({name, getData, tableHead, properties, deleteData}) {
    const [rows, setRows] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useSearchParams({ page: 1, size: 7 });
    const [page, setPage] = useState(Number(param.get("page")) || 1);
    const size = param.get("size") || 8;

    const handleDelete = async (id) => {
        setRows(prevRows => {
            if (prevRows.length === 1) updatePage(page > 1 ? page - 1 : 1);
            const newRows = prevRows.filter(row => row.id !== id);
            return newRows;
        });
    };

    const updatePage = (page) => {
        setPage(page);
        setParam({page, size});
    }

    useEffect(() => {
        const fetchTableRows = async () => {
            const {pagination, data} = await getData(page - 1, size);
            const {totalPages, pageSize, currentPage} = pagination;

            if (page > totalPages){
                setParam({ page: totalPages, size: pageSize });
                setPage(totalPages);
                setTotalPages(totalPages);
                return;
            }

            if (size != pageSize || page != currentPage + 1) 
                setParam({ page: currentPage + 1, size: pageSize });

            setTotalPages(totalPages)
            setRows(data);
        }

        fetchTableRows();
    }, [getData, page, setParam, size])

    return (
        <Card className="h-full w-full mt-1">
            <MyCardHeader title={name} />

            <CardBody className="px-0 -mt-2">
                {!totalPages && <div className="text-gray-500 text-base ml-4 mt-5">No data available</div>}    
                
                {!!totalPages && <table className="w-full table-auto text-left">
                    <TableHeader headers={tableHead} />
                    
                    <TableBody
                        data={rows}
                        name={name}
                        properties={properties}
                        handleDelete={handleDelete}
                        deleteRow={deleteData}
                    />
                </table>
                }           
            </CardBody>

            <MyCardFooter 
                totalPages={totalPages} 
                page={page} 
                updatePage={updatePage} />
        </Card>
    );
}
