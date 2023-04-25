import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen  = useSelector(selectIsCartOpen);

  console.log("Login User is:", currentUser);
  console.log("is Cart Open :", isCartOpen);

  const signOutHandler = async () => {
    const res = await signOutUser();
    console.log(res);
    alert("Good bye!.");
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {
            currentUser ? ( <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink> )
                        : ( <NavLink to='/auth'>SIGN IN</NavLink> )
          }
          <CartIcon />
        </NavLinks>
        {
          isCartOpen ? <CartDropdown />
                     : ""
        }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
