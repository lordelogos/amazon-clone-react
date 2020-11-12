import "./App.css";
import React, { useEffect } from "react";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./components/StateProvider";
import { auth } from "./components/firebase";

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

	console.log("USER IS ", user);

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
				<Route path="/">
					<Nav />
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
