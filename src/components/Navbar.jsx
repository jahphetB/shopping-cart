import { NavLink } from "react-router";
import "../styles/Navbar.css";

export default function Navbar({ cartCount }) {
	return (
		<header className="site-header">
			<nav className="navbar">
				<NavLink className="nav-link nav-home" to="/">
					Home
				</NavLink>

				<NavLink className="nav-link nav-shop" to="/shop">
					Shop
				</NavLink>

				<NavLink className="nav-link nav-cart" to="/cart">
                    Cart{" "}
                    {cartCount > 0 && (
                        <span className="cart-count">({cartCount})</span>
                    )}
                </NavLink>
			</nav>
		</header>
	);
}