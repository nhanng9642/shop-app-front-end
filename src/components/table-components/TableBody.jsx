/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";

import { Action } from "@/components";

function getValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc[key], obj);
}

export function TableBody({data, properties, name,
                            handleDelete, deleteRow}) {
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
                                    {getValue(row, key) || "N/A"}
                                </Typography>
                            </td>
                        ))}

                        <td className={classes}>
                            <Action 
                                route={`/admin/${name}/`}
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
