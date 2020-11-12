import React from "react";
import "./Nav.css";
import { ReactComponent as Search } from "../search.svg";
import { ReactComponent as Cart } from "../cart.svg";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Nav() {
	const [{ basket, user }] = useStateValue();

	return (
		<nav className="nav">
			<Link to="/" className="nav__links">
				<img src="./amazon.png" alt="" className="nav__logo" />
			</Link>
			<div className="nav__search">
				<input type="text" className="nav__input" />
				<button className="nav__searchbtn">
					<Search className="nav__icon" />
				</button>
			</div>
			<div className="nav__actions">
				<Link to={"/login"} className="nav__links">
					<div className="nav__act">
						<span className="nav__actlineone">
							Hello, {user !== null ? user.email : "user"}
						</span>
						<span className="nav__actlinetwo">
							{user !== null ? "Sign Out" : "Sign In"}
						</span>
					</div>
				</Link>
				<div className="nav__act">
					<span className="nav__actlineone">Returns</span>
					<span className="nav__actlinetwo">& Orders</span>
				</div>
				<Link to="/checkout" className="nav__links">
					<div className="nav__basketact">
						<Cart className="nav__icon basket_icon" />
						<span className="nav__actlinetwo">{basket.length}</span>
					</div>
				</Link>
			</div>
		</nav>
	);
}

export default Nav;
