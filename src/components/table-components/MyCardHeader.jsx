/* eslint-disable react/prop-types */
import { CardHeader, Typography, Button } from "@material-tailwind/react"
import { Link } from "react-router-dom"

export function MyCardHeader({title}) {
    return (
        <CardHeader floated={false} shadow={false} className="rounded-none h-full">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <Typography variant="h4" color="blue-gray">
                    {title}
                </Typography>

                <Link to={`/admin/${title.toLowerCase()}/add`}>
                    <Button color="green" >Add {title}</Button>
                </Link>
            </div>
        </CardHeader>
    )
}
