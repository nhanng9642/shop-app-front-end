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
import { useUserContext } from "@/context/user";
import { cartService } from "@/services";

export const ProductCartQty = ({product, quantity}) => {
	const {cart, setCart} = useUserContext(); 
	return (
		<Card className="max-w-[300px] overflow-hidden rounded-none">
			<Link to={`/user/product-views/${product._id}`}>
				<CardHeader
					onClick={() => {

					}}
					floated={false}
					color="transparent"
					className="m-0 rounded-none p-2 hover:bg-[#f1f5f9] cursor-pointer"
				>
					<img src={product.image}
						className="object-contain h-[300px] mx-auto my-auto"/>
				</CardHeader>
			</Link>	
			<CardBody className="grow opacity-85 flex flex-row justify-between">
				<Typography variant="p" color="blue-gray" className="md:text-xl text-center">
					{product.name}	
				</Typography>
				<Typography variant="p" color="red" className="md:text-xl font-normal text-center">
					{product.price}
				</Typography>
			</CardBody>
			<CardFooter className="flex flex-row flex-wrap items-center justify-between p-2 opacity-85">
				<div className="grow flex flex-row justify-between items-center mb-1 mx-1">
					<Button className="bg-white text-black"
						onClick={() => {
							const decreaseQty = async() => {
								const rs = await cartService.updateCartItem({id: product._id, quantity: quantity - 1})
								setCart(rs.data);
							};
							if(quantity > 1){
								decreaseQty();
							}
						}}
					>
						-
					</Button>	
					<div className="grow text-center min-w-[32px]">
						<Typography>&nbsp;{quantity}&nbsp;</Typography>
					</div>
					<Button className="bg-white text-black"
						onClick={() => {
							const increaseQty = async() => {
								const rs = await cartService.updateCartItem({id: product._id, quantity: quantity + 1})
								setCart(rs.data);
							};
							if(quantity < product.inventory){
								increaseQty();
							}
						}}
					>
						+
					</Button>	
				</div>	
				<Button className="grow text-white bg-[#f50057] text-center text-sm h-[40px]"
					onClick={() => {
						cartService.deleteCartItem(product._id)
							.then(res => {
								if(res.status == 204){
									setCart(cart.filter(item => item.productID != product._id));
								}
							});
					}}
				>
					Remove
				</Button>
			</CardFooter>
		</Card>
	);
};