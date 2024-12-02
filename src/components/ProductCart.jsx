/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

import { useCartContext } from "@/context/cart-context";

export const ProductCart = ({book}) => {
    const { updateCart } = useCartContext();

	return (
		<Card className="max-w-[300px] overflow-hidden rounded-none">
			<Link to={`product-views/${book.id}`}>
				<CardHeader
					floated={false}
					shadow={false}
					color="transparent"
					className="m-0 rounded-none p-2 hover:bg-[#f1f5f9] cursor-pointer"
				>
					<img src={book.bookImage} alt={book.title}
						className="object-contain h-[300px] mx-auto my-auto"/>
				</CardHeader>
			</Link>	

			<CardBody className="grow opacity-85 bg-[#ccc]">
				<Typography variant="h6" color="blue-gray" className="md:text-xl text-center">
					{book.title || "N / A"}	
				</Typography>
				<Typography variant="h6" color="red" className="mt-3 md:text-xl font-normal text-center">
					Price: {book.price || "N / A"}
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
                        updateCart(book);
					}} 
				>
					<b>ADD TO CART</b> 
				</Button>
			</CardFooter>
		</Card>
	);
}