import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCfeXK3MNsojzYN4_o9658phrRYuhI4CGQ",
	authDomain: "clone-8db17.firebaseapp.com",
	databaseURL: "https://clone-8db17.firebaseio.com",
	projectId: "clone-8db17",
	storageBucket: "clone-8db17.appspot.com",
	messagingSenderId: "22339967178",
	appId: "1:22339967178:web:7b482cafe2b74eec6dfc33",
	measurementId: "G-9WV45YY30V",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
