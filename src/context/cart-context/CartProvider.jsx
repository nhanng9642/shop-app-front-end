/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { CartContext } from "./CartContext";
import { getCartItems, addCartItem,
    deleteCartItem, updateCartItem } from "@/services";
import toast from "react-hot-toast";

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    
    const updateCart = (book, quantity) => {
        const bookId = book.id;

        if (quantity === undefined) {
            const item = cartItems.find(item => item.book.id === bookId);
            if (!item) {
                fetchWithToast(addCartItem, {bookId, quantity: 1}, "Adding to cart...");
                setCartItems([...cartItems, {book, quantity: 1}]);
                return;
            }
            else quantity = item.quantity + 1;
        }

        const newCart = cartItems.map(item => {
            if (item.book.id === bookId && quantity == 0) return;
            if (item.book.id === bookId) return {...item, quantity};
            return {...item};
        }).filter(item => item)
        
        if (quantity === 0) fetchWithToast(deleteCartItem, {bookId}, "Removing from cart...");
        else fetchWithToast(updateCartItem, {bookId, quantity}, "Updating cart...");
        
        setCartItems(newCart);
    }

    const fetchWithToast = (func, data, loadingMessage = "Loading...") => {
        toast.promise(
            func(data),
            {
                loading: loadingMessage,
                success: res => res.message,
                error: err => err.message
            }
        )
    }

    const emptyCart = () => {
        setCartItems([]);
    }

    useEffect(() => {
		const fetchData = async () => {
			const { data: cartItems } = await getCartItems();
			setCartItems(cartItems);
		}
		fetchData();
	}, []);
    
    return (
        <CartContext.Provider value={{ cartItems, updateCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
}