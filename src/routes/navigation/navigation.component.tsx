import { Outlet } from "react-router-dom"

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { signOutStart } from "../../store/user/user.action";

import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink
} from './navigation.styles'

const Navigation = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);

    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());

    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <span onClick={signOutUser}>SIGN OUT</span>
                    ) : (
                        <NavLink to='/auth'>
                            Sign In
                        </NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}

            </NavigationContainer>
            <Outlet />
        </>
    )
}

export default Navigation