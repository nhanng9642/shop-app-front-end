import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { cartService } from "../utils";
import { useUserContext } from "../context/user";
export const ProductCart = ({book}) => {
	const {cart, setCart} = useUserContext();
	return (
		<Card className="max-w-[300px] overflow-hidden rounded-none">
			<Link to={`product-views/${book._id}`}>
				<CardHeader
					floated={false}
					shadow={false}
					color="transparent"
					className="m-0 rounded-none p-2 hover:bg-[#f1f5f9] cursor-pointer"
				>
					<img src={book.image}
						className="object-contain h-[300px] mx-auto my-auto"/>
				</CardHeader>
			</Link>	
			<CardBody className="grow opacity-85 bg-[#ccc]">
				<Typography variant="p" color="blue-gray" className="md:text-xl text-center">
					{book.name}	
				</Typography>
				<Typography variant="p" color="red" className="mt-3 md:text-xl font-normal text-center">
					Price: {book.price}
				</Typography>
			</CardBody>
			<CardFooter className="flex justify-between p-2 opacity-85 bg-[#ccc]">
				<Button
					size="lg"
					color="white"
					className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 bg-[#263238] text-white"
					ripple={false}
					fullWidth={true}
					onClick={() => {
						const addData = async() => {
							const rs = await cartService.addCartItem({productID:book._id})
							setCart(rs.data);
						}
						addData();
					}} 
				>
					<b>ADD TO CART</b> 
				</Button>
			</CardFooter>
		</Card>
	);
}