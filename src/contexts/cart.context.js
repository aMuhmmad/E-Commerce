// import { createContext, useReducer } from "react";

// import { createAction } from '../utils/reducer/reducer.utils'



// export const CartContext = createContext({
//     isCartOpen: false,
//     setIsCartOpen: () => { },
//     cartItems: [],
//     addItemToCart: () => { },
//     removeItemFromCart: () => { },
//     clearItemFromCart: () => { },
//     cartCount: 0,
//     cartTotal: 0
// });



// export const CartProvider = ({ children }) => {

//     const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

//     const { isCartOpen, cartItems, cartCount, cartTotal } = state;

//     const updateCartItemsReducer = (newCartItems) => {
        
//         dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal }));
//     }

    

//     const setIsCartOpen = (bool) => {
//         dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
//     }

//     const value = { isCartOpen, cartItems, cartCount, cartTotal, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart };


//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }