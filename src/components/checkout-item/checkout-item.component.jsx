import { useContext } from 'react';
import {CartContext} from '../../contexts/cart.context';

import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Arrow,
    Value,
    RemoveButton
    } from './checkout-item.styles'

const CheckOutItem = ( {cartItem} ) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const { clearItemToCart, addItemToCart, removeItemToCart } = useContext(CartContext);

    const clearItemHandler  = () => clearItemToCart(cartItem);
    const addItemhandler    = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} als={`${name}`}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick = {removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick = {addItemhandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price} €</BaseSpan>
            <RemoveButton onClick={ clearItemHandler }>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckOutItem;
