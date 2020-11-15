import "./App.css";
import React, { useEffect } from "react";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./components/StateProvider";
import { auth } from "./components/firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
	"pk_test_51Hn5SJJbLHodmKtJblSOFZnfzzQJDvOKNcLCxnhDWjw84M2xbehK8wl84FXdBgsi1ne0McfqLvznlLpeCve1Ji3a00nvsgJYxf"
);

function App() {
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//logged in
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				//logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/checkout">
					<Nav />
					<Checkout />
				</Route>
				<Route path="/orders">
					<Nav />
					<Orders />
				</Route>
				<Route path="/payment">
					<Nav />
					<Elements stripe={promise}>
						<Payment />
					</Elements>
				</Route>
				<Route path="/">
					<Nav />
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
