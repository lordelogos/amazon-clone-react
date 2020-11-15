import React from "react";
import "./Checkout.css";
import CheckProd from "./CheckProd";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";

function Checkout() {
	let history = useHistory();
	let [{ basket, user }] = useStateValue();

	return (
		<div className="checkout">
			{basket.length > 0 ? (
				<div className="checkout__list">
					<div className="checkout__items">
						<div className="checkout__mainTitle">
							<h1>Shopping Cart</h1>
							<p>Price</p>
						</div>
						<div className="checkout__itemList">
							{basket.map((item) => (
								<CheckProd object={item} key={item.id} />
							))}
						</div>
						<div className="checkout__total">
							<h1>
								Subtotal ({basket.length} {basket.length > 1 ? "items" : "item"}
								): $<strong>{getCartTotal(basket)}</strong>
							</h1>
						</div>
					</div>
					<div className="checkout__space2">
						<p>
							Subtotal ({basket.length} item): $
							{getCartTotal(basket).toFixed(2)}
						</p>
						<button
							className="checkout__checkout"
							onClick={(e) => history.push("/payment")}>
							Proceed to Checkout
						</button>
					</div>
				</div>
			) : (
				<div className="checkout__left">
					<div className="checkout__info">
						<div>
							<h1 className="checkout__header">Your Amazon Cart is empty</h1>
							<Link to="/" className="checkout__desc">
								<p>Shop Today's deals</p>
							</Link>
							<Link to={!user ? "/login" : "/"} className="checkout__btn">
								<div className="checkout__cta">
									<button className="checkout__signin">
										{user ? "Continue Shopping" : "Sign in to your acccount"}
									</button>
									<button className="checkout__signup">
										{user ? "New arrivals" : "Sign up now"}
									</button>
								</div>
							</Link>
						</div>
					</div>
					<div className="checkout__space"></div>
					<div className="checkout__disc">
						<p>
							The price and availability of items at Amazon.com are subject to
							change. The Cart is a temporary place to store a list of your
							items and reflects each item's most recent price.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Checkout;
