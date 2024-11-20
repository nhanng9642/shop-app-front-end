/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";

import { Action } from "@/components";

export function TableBody({data, properties, handleDelete, deleteRow}) {
  return (
        <tbody>
            {data.map((row, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast ? "category p-3" : "category p-3 border-b border-blue-gray-50";

                return (
                    <tr key={row.id}>
                        {properties.map((key) => (
                            <td key={key} className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal" 
                                >
                                    {row[key]}
                                </Typography>
                            </td>
                        ))}

                        <td className={classes}>
                            <Action 
                                route={`/admin/category/`}
                                _id={row.id}
                                onDelete={handleDelete}
                                deleteRow={deleteRow}
                            />
                        </td>
                    </tr>
                );
            })}
        </tbody>
  );
}
