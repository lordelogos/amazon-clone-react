const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51Hn5SJJbLHodmKtJK7IlzW9hRRhljZdEpkrGtm2GAyRqfJS7x3Wh1yP5gZZNoBbIq77W1iHt0tp2JwUGLZrpN2ev00LTf6cw4c"
);

// API

// App config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Api routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
	const total = request.query.total;

	console.log("Payment Request recieved", total);

	const paymentIntent = await stripe.paymentIntent.create({
		amount: total,
		currency: "usd",
	});

	//OK - created
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

// Listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-8db17/us-central1/api
