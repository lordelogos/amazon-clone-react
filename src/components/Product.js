import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product(props) {
	const [{ basket }, dispatch] = useStateValue();
	let add2Cart = () => {
		dispatch({
			type: "ADD_TO_CART",
			item: {
				name,
				rating,
				price,
				image,
				id: Math.floor(Math.random * 123456789) + new Date(),
			},
		});
	};
	let { name, rating, price, image } = props.object;
	return (
		<div className={"product " + props.area}>
			<p className="product__name">{name}</p>
			<div className="product__rating">
				{Array(rating)
					.fill()
					.map((item, index) => (
						<p key={index}>🌟</p>
					))}
			</div>
			<p className="product__price">
				<small>$</small>
				<strong>{price}</strong>
			</p>

			<img src={image} alt="product name" className="product__image" />
			<button className="product__a2c" onClick={add2Cart}>
				Add to Cart
			</button>
		</div>
	);
}

export default Product;
