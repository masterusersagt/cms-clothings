import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch       = useDispatch();
  const isCartOpen     = useSelector(selectIsCartOpen);
  const cartItemCount  = useSelector(selectCartCount);

  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen))
  };

  console.log("CartIcon is Open: ", isCartOpen, " and have itemsCount:", cartItemCount);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartItemCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
