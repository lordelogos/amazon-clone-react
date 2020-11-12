import React from "react";
import "./Home.css";
import Product from "./Product";

let products = [
	{
		name: "Logitech Z906 5.1 Surround Sound Speaker System",
		price: 271.11,
		rating: 4,
		image:
			"https://images-na.ssl-images-amazon.com/images/I/81eR41G4ydL._AC_SL1500_.jpg",
		id: 12,
	},
	{
		name: "HP 15-dy1036nr 10th Gen 15.6-Inch FHD Laptop",
		price: 616.99,
		rating: 4,
		image:
			"https://images-na.ssl-images-amazon.com/images/I/71WSt8D7KFL._AC_SL1500_.jpg",
		id: 13,
	},
	{
		name: 'Lenovo IdeaPad 3 14" Laptop, 14.0" FHD',
		price: 449.99,
		rating: 4,
		image:
			"https://images-na.ssl-images-amazon.com/images/I/71dqjxW8g5L._AC_SL1500_.jpg",
		id: 14,
	},
	{
		name: 'Dell XPS9360-3591SLV 13.3" Laptop',
		price: 989.99,
		rating: 3,
		image:
			"https://images-na.ssl-images-amazon.com/images/I/71VEsRcgHML._AC_SL1500_.jpg",
		id: 15,
	},
	{
		name: "PlayStation 4 Pro 1TB Console",
		price: 349.97,
		rating: 5,
		image:
			"https://images-na.ssl-images-amazon.com/images/I/41GGPRqTZtL._AC_SX425_.jpg",
		id: 16,
	},
	{
		name: "Xbox One S 1TB Console",
		price: 338.99,
		rating: 5,
		image:
			"https://images-na.ssl-images-amazon.com/images/I/71XHuIVqJbL._AC_SL1500_.jpg",
		id: 17,
	},
];

function Home() {
	return (
		<div className="home">
			<img
				src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/PrimeDay/Fuji_TallHero_NonPrime_v2_en_US_1x._CB403670067_.jpg"
				alt=""
				className="home__img"
			/>
			<div className="home__display">
				{/* <div className="home__subcat">
					<Product object={products[4]} key={products[4].id} />
					<Product object={products[5]} key={products[5].id} />
				</div>
				<div className="home__subcat1">
					<Product object={products[3]} key={products[3].id} />
					<Product object={products[2]} key={products[2].id} />
					<Product object={products[1]} key={products[1].id} />
				</div>
				<div className="home__subcat2">
					<Product object={products[0]} key={products[0].id} />
				</div> */}
				<Product object={products[4]} key={products[4].id} area="a" />
				<Product object={products[5]} key={products[5].id} area="b" />
				<Product object={products[3]} key={products[3].id} area="c" />
				<Product object={products[2]} key={products[2].id} area="d" />
				<Product object={products[1]} key={products[1].id} area="e" />
				<Product object={products[0]} key={products[0].id} area="f" />
			</div>
		</div>
	);
}

export default Home;
