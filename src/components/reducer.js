export const initialState = {
	basket: [],
	user: null,
};

export const getCartTotal = (basket) =>
	basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return {
				...state,
				basket: [...state.basket, action.item],
			};
		case "REMOVE_FROM_CART":
			let newCart = state.basket.filter((item) => item.id !== action.id);
			return {
				...state,
				basket: newCart,
			};
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		case "EMPTY_BASKET":
			return {
				...state,
				basket: [],
			};
		default:
			return state;
	}
};

export default reducer;
