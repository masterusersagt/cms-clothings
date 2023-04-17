import { useContext } from 'react';
import {CartContext} from '../../contexts/cart.context';

import './checkout-item.styles.scss'

const CheckOutItem = ( {cartItem} ) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const { clearItemToCart, addItemToCart, removeItemToCart } = useContext(CartContext);

    const clearItemHandler  = () => clearItemToCart(cartItem);
    const addItemhandler    = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);
    return (
        <div className='checkout-item-container' >
            <div className='iamge-container'>
                <img src={imageUrl} als={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div  classname='arrow' onClick = {removeItemHandler}>&#10094;</div>
                <span classname='value'>{quantity}</span>
                <div  classname='arrow' onClick = {addItemhandler}>&#10095;</div>
            </span>
            <span className='price'>{price} €</span>
            <span className='remove-button' onClick={ clearItemHandler }>&#10005;</span>
        </div>
    );
}

export default CheckOutItem;
