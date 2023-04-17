import './checkout-item.styles.scss'

const CheckOutItem = ( {cartItem} ) => {
    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <div className='checkout-item-container' >
            <div className='iamge-container'>
                <img src={imageUrl} als={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>{quantity}</span>
            <span className='price'>{price}</span>
            <span className='remove-button'>&#10005;</span>
        </div>
    );
}

export default CheckOutItem;
