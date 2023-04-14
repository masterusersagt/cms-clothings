import { Fragment , useContext} from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as ChmLogo } from '../../assets/crown.svg'

import CartIcon        from '../../components/cart-icon/cart-icon.component';
import CartDropdown    from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../util/firebase/firebase.util'

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen }  = useContext(CartContext);

  console.log("Login User is:", currentUser);

  const signOutHandler = async () => {
    const res = await signOutUser();
    console.log(res);

    alert("Good bye!.");
  };

  return (
    <Fragment>
      <div className='navigation' >
        <Link className='logo-container' to='/'>
          <ChmLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          {
            currentUser ? (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>)
                        : (<Link className='nav-link'      to='/auth'>SIGN IN</Link>)
          }
          <CartIcon/>
        </div>
        { 
          isCartOpen ? <CartDropdown/>
                     : ""
        }
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
