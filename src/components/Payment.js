import React, { useState, useEffect } from "react";
import OrdProd from "./OrdProd";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import "./payment.css";
import { getCartTotal } from "./reducer";
import axios from "./axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "./firebase";

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [clientSecret, setClientSecret] = useState(true);
	const history = useHistory();

	useEffect(() => {
		//generate client secret for charging customer based on basket change

		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				//stripe expects a total in currencies subunit
				url: `/payments/create?total=${getCartTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	console.log("THE SECRET IS >>>>", clientSecret);

	let handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);
		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					//confirming the client card
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// paymentIntent is the payment confirmation

				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					action: "EMPTY_BASKET",
				});

				history.replaceState("/orders");
			});
	};

	let handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	return (
		<div className="payment">
			<div className="payment__title">
				Checkout (
				<Link to="/checkout">
					{basket.length} {basket.length > 1 ? "items" : "item"}
				</Link>
				)
			</div>
			<div className="payment__delivery">
				<div className="payment__header">
					<h1>Delivery Address</h1>
				</div>

				<div className="payment__text">
					<p>{user ? user.email : "guest"}</p>
					<p>123, React js Avenue</p>
					<p>New York, CA</p>
				</div>
			</div>
			<div className="payment__items">
				<div className="payment__header">
					<h1>Items and delivery</h1>
				</div>
				<div className="payment__itemlist">
					{basket.length > 0 ? (
						basket.map((item) => (
							<OrdProd
								object={item}
								className="payment__prod"
								key={item.id}
								showRemoveButton={true}
							/>
						))
					) : (
						<div>Your order is empty</div>
					)}
				</div>
			</div>

			<div className="payment__details">
				<div className="payment__header">
					<h1>Payment method</h1>
				</div>
				<div className="payment__form">
					<form onSubmit={handleSubmit} className="payment__formMain">
						<CardElement onChange={handleChange} />
						<div className="payment__priceContainer">
							<p className="payment__bold">
								Order Total: ${getCartTotal(basket).toFixed(2)}
							</p>
							<button
								disabled={processing || disabled || succeeded}
								className="payment__paybtn">
								<span>{processing ? <p>processing</p> : "Buy now"}</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Payment;
