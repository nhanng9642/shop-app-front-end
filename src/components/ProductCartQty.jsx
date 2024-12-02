/* eslint-disable react/prop-types */
import {} from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const ProductCartQty = ({item, updateCart}) => {
    const {book, quantity} = item;

    const handleDecreaseBtn = () => {
        if (quantity > 0)
            updateCart(book, quantity - 1);
    }

    const handleIncreaseBtn = () => {
        updateCart(book, quantity + 1);
    }

    return (
		book && <Card className="max-w-[300px] overflow-hidden rounded-none">
			<Link to={`/user/product-views/${book.id}`}>
				<CardHeader
					floated={false}
					color="transparent"
					className="m-0 rounded-none p-2 hover:bg-[#f1f5f9] cursor-pointer"
				>
					<img src={book.bookImage}
						className="object-contain h-[300px] mx-auto my-auto"/>
				</CardHeader>
			</Link>	

			<CardBody className="grow opacity-85 flex flex-row justify-between">
				<Typography variant="paragraph" 
                            color="blue-gray" 
                            className="md:text-xl text-center">
					{book.title}	
				</Typography>
				<Typography variant="paragraph" color="red" className="md:text-xl font-normal text-center">
					{book.price}
				</Typography>
			</CardBody>

			<CardFooter className="flex flex-row flex-wrap items-center justify-between p-2 opacity-85">
				<div className="grow flex flex-row justify-between items-center mb-1 mx-1">
					<Button className="bg-white text-black"
						onClick={handleDecreaseBtn}
					>
						-
					</Button>	
					<div className="grow text-center min-w-[32px]">
						<Typography>&nbsp;{quantity}&nbsp;</Typography>
					</div>
					<Button className="bg-white text-black"
						onClick={handleIncreaseBtn}
					>
						+
					</Button>	
				</div>	
				<Button className="grow text-white bg-[#f50057] text-center text-sm h-[40px]"
					onClick={() => updateCart(book, 0)}
				>
					Remove
				</Button>
			</CardFooter>
		</Card>
	);
};