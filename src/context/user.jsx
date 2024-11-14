import { createContext, useState, useContext, useEffect } from 'react';
import { cartService } from '../services/CartService';

export const UserContext = createContext(); 

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
	const [cart, setCart] = useState([]);
	useEffect(() => {
		const fetchCart = async () => {
			let temp = await cartService.getCartItems();
			temp = temp.data.map(item => ({...item, productID:item.productID._id}))
			setCart(temp);
		}
		fetchCart();
	},[]);
	return (
		<UserContext.Provider value={{cart,setCart}}>
			{children}
		</UserContext.Provider>
	)	
}

export const useUserContext = () => {
	const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider')
    }
    return context;
}