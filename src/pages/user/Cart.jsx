import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"

import { Typography,Button } from "@material-tailwind/react";
import { addOrder} from "@/services";
import { ProductCartQty } from "@/components";
import { useCartContext } from "@/context/cart-context";

export const Cart = () => {
	const { cartItems, updateCart, emptyCart } = useCartContext();  
    const [total, setTotal] = useState([]);
	
    useEffect( () => {
        const totalPrice = cartItems.reduce((price, item) =>
            price + item?.book?.price * item.quantity, 0);

        setTotal(totalPrice.toFixed(2));
    }, [cartItems]);
    
	const handlePayment = async () => {
        const shippingAddress = "123 Main St, New York, NY 10030";

        toast.promise(
            addOrder({orderDetails: cartItems, shippingAddress}),
            {
                loading: 'Processing your order...',
                success: res => { 
                    emptyCart();
                    return res.message
                },
                error: err => err.message
            }
        )		
	}
	
	const renderEmptyCart = () => (
		<Typography className="text-base">
			You have no items in your shopping cart,
			<Link to="/user" className="text-[#007BFF]"> start adding some</Link>!
		</Typography>
	)

	const renderCart = () => (
		<>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
				{
					cartItems.map(item => {
                        return (
                            <ProductCartQty
                                key={item.id}
                                updateCart={updateCart}
                                item={item}
                            />
                        )
						
					})
				}	
			</div>

			<div className="flex flex-row flex-nowrap justify-between mt-[40px]">
				<Typography variant="h6"
                    className="text-2xl flex items-center">
					Total:&nbsp;<b className="text-[#F50057]">{total}</b>
				</Typography>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-row flex-wrap justify-between items-center">
						<Button className="text-white text-base bg-[#F50057] w-[160px] mb-1 mr-5"
							onClick={emptyCart}
						>
							Empty Cart
						</Button>
					</div>
					
                    <div className="flex flex-row flex-wrap justify-between items-center">
						<Button className="text-white text-base bg-[#263238] w-[160px] mb-1 mr-5"
							onClick={handlePayment}
						>
							Order	
						</Button>
					</div>
				</div>
			</div>
		</>
	)
	return (
		<main className="flex-grow-1 overflow-hidden p-8 min-h-[200px]">
			<Typography as="h5" className="text-2xl font-semibold">Your Shopping Cart</Typography>
			<hr className="my-2"/> 
			{cartItems.length == 0 ? renderEmptyCart(): renderCart()}
		</main>
	)
}