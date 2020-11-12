import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Login() {
	let [{ user }] = useStateValue();
	let history = useHistory();
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let login = (e) => {
		e.preventDefault();
		console.log("logged in");
		auth
			.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				history.push("/");
			})
			.catch((e) => alert(e.message));
	};

	let register = (e) => {
		e.preventDefault();
		console.log("registered");
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				history.push("/");
			})
			.catch((e) => alert(e.message));
	};

	let handleSignOut = () => {
		if (user) {
			auth.signOut();
		}
	};
	return (
		<div className="login">
			<Link to="/" className="nav__links">
				<img src="./amazonBlack.png" alt="" className="login__logo" />
			</Link>
			{!user ? (
				<div className="login__box">
					<h1 className="login__mainTitle">Sign In</h1>
					<form className="login__form">
						<input
							type="email"
							required
							name="email"
							placeholder="Email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<input
							type="password"
							required
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<button onClick={login} className="login__signbtn" type="submit">
							Sign in
						</button>
						<p>
							By continuing, you agree to Amazon's Conditions of Use and Privacy
							Notice.
						</p>
						<p className="login__new">Are you a new Customer?</p>
						<button className="login__create" type="submit" onClick={register}>
							Create a new account
						</button>
					</form>
				</div>
			) : (
				<div className="login__box">
					<p className="login__logoutTxt">We would love for you to stay</p>
					<button className="login__signout" onClick={handleSignOut}>
						SignOut
					</button>
				</div>
			)}
		</div>
	);
}

export default Login;
