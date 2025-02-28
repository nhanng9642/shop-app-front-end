/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";

export function TableHeader({ headers }) {
  return (
        <thead>
            <tr>
                {headers.map((head) => (
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
  );
}
