import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_TYPE_CLASSES } from "../../components/button/button.component";

import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
} from './checkout.styles';





const Checkout = () => {

    const navigate = useNavigate();
    const goToCheckoutFormHandler = () => {
        navigate('/checkout-form');
    };

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);


    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <Total>Total: ${cartTotal}</Total>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={goToCheckoutFormHandler}
            >
                Proceed to checkout
            </Button>
        </CheckoutContainer>
    )
}

export default Checkout;