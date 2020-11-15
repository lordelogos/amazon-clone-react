import React from "react";
import "./OrderItem.css";
import OrdProd from "./OrdProd";
import moment from "moment";

function OrderItem({ order }) {
	return (
		<div className="order">
			<h2>Order</h2>
			<p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
			<p className="order__id">
				<small>{order.id}</small>
			</p>
			{order.data.basket?.map((item) => (
				<OrdProd object={item} showRemoveButton={false} />
			))}
			<p className="order__total">
				Order Total: ${(order.data.amount / 100).toFixed(2)}
			</p>
		</div>
	);
}

export default OrderItem;
