import { useDispatch, useSelector } from 'react-redux';

import {addItemToCart,removeItemFromCart,clearItemFromCart} from '../../store/cart/cart.action'

import {
    Arrow,
    BaseSpan,
    CheckoutItemContainer,
    ImageContainer,
    Quantity,
    RemoveButton,
    Value
} from './checkout-item.styles';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.types';
import { FC } from 'react';

type CheckoutItemProps = {
    cartItem: CartItem;
  };
const CheckoutItem:FC<CheckoutItemProps> = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;
    
    const cartItems = useSelector(selectCartItems)

    const dispatch = useDispatch();

    const addItemHandler = () =>  dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

    return (

        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan> {name} </BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan> {price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;