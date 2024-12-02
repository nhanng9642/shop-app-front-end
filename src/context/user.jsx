// import { createContext, useState, useContext, useEffect } from 'react';
// import { getCartItems } from '@/services';

// export const UserContext = createContext(); 

// // eslint-disable-next-line react/prop-types
// export const UserContextProvider = ({children}) => {
// 	const [cart, setCart] = useState([]);
// 	useEffect(() => {
// 		const fetchCart = async () => {
// 			const { data: cart }  = await getCartItems();
// 			setCart(cart);
// 		}
// 		fetchCart();
// 	},[]);

// 	return (
// 		<UserContext.Provider value={{cart, setCart}}>
// 			{children}
// 		</UserContext.Provider>
// 	)	
// }

// export const useUserContext = () => {
// 	const context = useContext(UserContext);
//     if (!context) {
//         throw new Error('useUserContext must be used within a UserContextProvider')
//     }
//     return context;
// }