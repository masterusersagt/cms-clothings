import { useDispatch, useSelector }                         from 'react-redux';

import { addItemToCart, clearItemToCart, removeItemToCart } from '../../store/cart/cart.action';

import { selectCartItems }                                  from '../../store/cart/cart.selector';

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
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearItemHandler  = () => { dispatch(clearItemToCart(cartItems, cartItem)) };
    const addItemhandler    = () => { dispatch(addItemToCart(cartItems, cartItem)) };
    const removeItemHandler = () => { dispatch(removeItemToCart(cartItems, cartItem)) };

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
