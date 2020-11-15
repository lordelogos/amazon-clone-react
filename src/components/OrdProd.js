import "./OrdProd.css";
import React from "react";
import { useStateValue } from "./StateProvider";

function CheckProd(props) {
	let { name, rating, price, image, id } = props.object;
	let [{ basket }, dispatch] = useStateValue();
	// let { name, rating, price, image } = {
	// 	name: 'Lenovo IdeaPad 3 14" Laptop, 14.0" FHD',
	// 	price: 449.99,
	// 	rating: 4,
	// 	image:
	// 		"https://images-na.ssl-images-amazon.com/images/I/71dqjxW8g5L._AC_SL1500_.jpg",
	// 	id: 14,
	// };

	let removeFromCart = () => {
		dispatch({
			type: "REMOVE_FROM_CART",
			id: id,
		});
	};
	return (
		<div className="checkprod">
			<div className="checkprod__img">
				<img src={image} alt="product name" className="checkprod__image" />
			</div>
			<div className="checkprod__txt">
				<p className="checkprod__name">{name}</p>
				<p className="checkprod__price">
					$<strong>{price}</strong>
				</p>
				<div className="checkprod__rating">
					{Array(rating)
						.fill()
						.map((item, index) => (
							<p key={index}>🌟</p>
						))}
				</div>
				{props.showRemoveButton && (
					<button className="checkprod__rmv" onClick={removeFromCart}>
						Remove from order
					</button>
				)}
			</div>
		</div>
	);
}

export default CheckProd;
