import {
    Card,
    CardBody,
} from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

import { CategoryService } from '@/services'
import {  MyCardFooter, MyCardHeader, TableBody, TableHeader } from '@/components';

const TABLE_HEAD = ["#", "Name", "Description", "Action"];
const properties = ["id", "categoryName", "description"];

export function CategoryTable() {
    const [rows, setRows] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useSearchParams({ page: 1, size: 7 });
    const [page, setPage] = useState(Number(param.get("page")) || 1);
    const size = param.get("size") || 8;

    const handleDelete = async (id) => {
        setRows(prevRows => {
            const newRows = prevRows.filter(row => row.id == id);
            
            if (prevRows.length === 1) setPage(page - 1);
            return newRows;
        });
    };

    const updatePage = (page) => {
        setPage(page);
        setParam({page, size});
    }

    useEffect(() => {
        const fetchTableRows = async () => {
            const {pagination, data} = await CategoryService.getCategories(page - 1, size);
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
    }, [page, setParam, size])

    return (
        <Card className="h-full w-full mt-1">
            <MyCardHeader title="Category" />

            <CardBody className="px-0 -mt-2">
                <table className="w-full table-auto text-left">
                    <TableHeader headers={TABLE_HEAD} />

                    <TableBody
                        data={rows}
                        properties={properties}
                        handleDelete={handleDelete}
                        deleteRow={CategoryService.deleteCategory}
                    />
                </table>
            </CardBody>

            <MyCardFooter 
                totalPages={totalPages} 
                page={page} 
                updatePage={updatePage} />
        </Card>
    );
}
