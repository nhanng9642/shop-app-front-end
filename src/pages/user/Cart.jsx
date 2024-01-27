import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useUserContext } from "../../context/user";
import { Typography,Button } from "@material-tailwind/react";
import { ProductService, cartService} from "../../utils";
import { ProductCartQty } from "../../components";
export const Cart = () => {
	const [books, setBooks] = useState([]);
	const {cart , setCart} = useUserContext();
	useEffect(() => {
		window.scrollTo(0,0);
		const fetchData = async () => {
			const promises = cart.map(item => ProductService.getProduct(item.productID));
			const products = await Promise.all(promises);
			setBooks(products);
		}
		fetchData();
	}, []);
	
	
	const renderEmptyCart = () => (
		<Typography className="text-base">
			You have no items in your shopping cart,
			<Link to="/" className="text-[#007BFF]"> start adding some</Link>!
		</Typography>
	)
	const renderCart = () => (
		<>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
				{
					books.map(item => {
						let c = cart.find(i => i.productID === item._id);
						if(c){
							return (
								<ProductCartQty
									product={item}
									quantity={c.quantity}
								/>
							)
						}
					})
				}	
			</div>
			<div className="flex flex-row flex-nowrap justify-between mt-[40px]">
				<Typography className="text-2xl flex items-center">
					Total:&nbsp;<b className="text-[#F50057]">{
						cart.reduce((total, item) => {
							const book = books.find(p => p._id === item.productID)
							if(book){
								return total + item.quantity * book.price;
							}
							return total;
						},0)
					}</b>
				</Typography>
				<div className="flex flex-row flex-wrap justify-between items-center">
					<Button className="text-white text-base bg-[#F50057] w-[160px] mb-1 mr-5"
						onClick={() => {
							cartService.deleteAllCartItem()
								.then(res => {
									if(res.status == 204){
										setCart([]);
									}
								})
						}}
					>
						EMPTY CART
					</Button>
				</div>
			</div>
		</>
	)
	return (
		<main className="flex-grow-1 overflow-hidden p-8 min-h-[200px]">
			<Typography as="h5" className="text-2xl font-semibold">Your Shopping Cart</Typography>
			<hr className="my-2"/> 
			{cart.length == 0 ? renderEmptyCart(): renderCart()}
		</main>
	)
}