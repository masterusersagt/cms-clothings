import { Fragment , useContext}      from 'react';
import { Outlet, Link }              from 'react-router-dom';
import { ReactComponent as ChmLogo } from '../../assets/crown.svg'
import { useSelector }               from 'react-redux';
import CartIcon                      from '../../components/cart-icon/cart-icon.component';
import CartDropdown                  from '../../components/cart-dropdown/cart-dropdown.component';

import { CartContext }               from '../../contexts/cart.context';

import { signOutUser }               from '../../utils/firebase/firebase.utils'

import { selectCurrentUser }         from '../../store/user/user.selector';

import {NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  const { isCartOpen }  = useContext(CartContext);

  console.log("Login User is:", currentUser);

  const signOutHandler = async () => {
    const res = await signOutUser();
    console.log(res);

    alert("Good bye!.");
  };

  return (
    <Fragment>
      <NavigationContainer >
        <LogoContainer to='/'>
          <ChmLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {
            currentUser ? (<NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>)
                        : (<NavLink to='/auth'>SIGN IN</NavLink>)
          }
          <CartIcon/>
        </NavLinks>
        { 
          isCartOpen ? <CartDropdown/>
                     : ""
        }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
