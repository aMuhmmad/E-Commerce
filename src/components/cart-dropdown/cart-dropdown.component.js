import { useContext } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

import './cart-dropdown.styles'

const CartDropdown = () => {

    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
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