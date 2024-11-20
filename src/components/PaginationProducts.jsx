import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Avatar,
    Button,
} from "@material-tailwind/react";
import { Link, useSearchParams } from "react-router-dom";

import { ProductService } from "@/services";
import { Action, MyCardFooter } from '@/components'
const TABLE_HEAD = ["Book", "Author", "Inventory", "Price", "Genre", "Description", "Actions"];


export function PaginationProducts() {
    const [rows, setRows] = useState([]);
    const [param, setParam] = useSearchParams({ page: 1, size: 7 });
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(Number(param.get("page")) || 1);
    const size = param.get("size") || 8;
    
    const [updateFlag, setForceUpdateFlag] = useState(false);
    const manualRerender = () => {
        setForceUpdateFlag(prevFlag => !prevFlag);
    };

    const updatePage = (page) => {
        setPage(page);
        setParam({page, size});
    }
    
    useEffect(() => {
        const fetchTableRows = async () => {
            const {pagination, data} = await ProductService.getProducts(page - 1, size);
            const {totalPages, pageSize, currentPage} = pagination;

            if (page > pagination.totalPages){
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
    }, [page, setParam, size, updateFlag])

    return (
        <Card className="h-full w-full mt-1">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <Typography variant="h5" color="blue-gray">
                        Product
                    </Typography>
                    <Link to="/admin/product/add">
                        <Button color="green" >Add Product</Button>
                    </Link>
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
                                        {head || ""}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(
                            (
                                {
                                    id,
                                    author,
                                    title,
                                    category,
                                    bookImage,
                                    price,
                                    quantityAvailable,
                                    description,
                                },
                                index,
                            ) => {
                                const isLast = index === rows.length - 1;
                                const classes = isLast
                                    ? "p-3"
                                    : "p-3 border-b border-blue-gray-50";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={bookImage}
                                                    alt={title}
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {title || ""}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {author}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {quantityAvailable || ""}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {price || ""}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {category?.categoryName || "Null"}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes} >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {description || ""}
                                            </Typography>
                                        </td>

                                        <td className={classes} >
                                            <Action route={`/admin/product/`}
                                                _id={id}
                                                manualRerender={manualRerender}
                                                deleteRow={ProductService.deleteProduct}
                                            />
                                        </td>
                                    </tr>
                                );
                            },
                        )}


                    </tbody>
                </table>
            </CardBody>

            <MyCardFooter totalPages={totalPages} page={page} updatePage={updatePage} />
        </Card>
    )
}
