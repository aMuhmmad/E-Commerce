import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import './cart-dropdown.styles'

const CartDropdown = () => {

    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems  = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        dispatch(setIsCartOpen(!isCartOpen));
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))) : <EmptyMessage>You cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>

        </CartDropdownContainer>
    )
}

export default CartDropdown;