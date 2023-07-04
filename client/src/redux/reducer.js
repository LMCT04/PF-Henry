import {
    ORDER_ALPHABETIC,
    ORDER_PRICE,
    GET_ALL_PRODUCTS,
    CREATE_PRODUCT,
    FILTER_CATEGORY,
    FILTER_TYPE,
    CLEAR_CART_FILTERS,
    GET_BY_NAME,
    FILTER_CATEGORY_AND_TYPE,
    GET_BY_ID,
    CLEAR_STATE,
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    SET_FAVORITE,
} from "./actionsType/productsAT";

import {
    POST_USERS,
    GET_USERS,
    UPDATE_USER,
    SET_USER,
    USER_BY_NAME,
    USER_ORDER_ALPHABETIC,
} from "./actionsType/usersAT";

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    GET_CART_BY_ID,
} from "./actionsType/cartAT";

import { GET_ALL_CATEGORIES } from "./actionsType/categoryAT";

const initialState = {
    allProducts: [],
    product: [],
    productDetail: {},
    newProduct: {},
    newUser: {},
    user: [],
    category: [],
    favoriteProduct: [],
    shoppingCart: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                product: action.payload,
                allProducts: action.payload,
            };

        case GET_BY_NAME:
            return {
                ...state,
                product: action.payload,
            };

        case GET_BY_ID:
            return {
                ...state,
                productDetail: action.payload,
            };

        case CLEAR_STATE:
            return {
                ...state,
                productDetail: {},
            };

        case CREATE_PRODUCT:
            return {
                ...state,
                newProduct: action.payload,
            };

        case ORDER_ALPHABETIC:
            let copyThree = [...state.product];
            let sortedName;

            if (action.payload === "asc") {
                sortedName = copyThree.sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                );
            } else if (action.payload === "desc") {
                sortedName = copyThree.sort((a, b) =>
                    b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                );
            } else {
                return {
                    ...state,
                    product: [...state.product],
                };
            }

            return {
                ...state,
                product: sortedName,
            };

        case ORDER_PRICE:
            let priceOrder = [...state.product];
            let price =
                action.payload === "asc"
                    ? priceOrder.sort((a, b) => a.price - b.price)
                    : priceOrder.sort((a, b) => b.price - a.price);
            return {
                ...state,
                product: price,
            };

        case FILTER_CATEGORY:
            const allProducts = state.allProducts;
            const productsFilt = [];
            let filter = [];

            allProducts.forEach((product) => {
                if (product.category === action.payload)
                    productsFilt.push(product);
            });

            action.payload === "ALL"
                ? (filter = allProducts)
                : (filter = productsFilt);

            return {
                ...state,
                product: filter,
            };

        case FILTER_TYPE:
            const products2 = state.allProducts;
            let newproduct = [];
            if (action.pawload === "ALL") {
                newproduct = products2;
            } else {
                products2.forEach((product) => {
                    if (
                        product.categories.some(
                            (category) => category === action.payload
                        )
                    ) {
                        newproduct.push(product);
                    }
                });
            }
            return {
                ...state,
                product: newproduct,
            };

        case CLEAR_CART_FILTERS:
            return {
                ...state,
                product: state.allProducts,
            };

        case FILTER_CATEGORY_AND_TYPE:
            const { category, type } = action;
            let filteredProducts = state.allProducts;

            if (category !== "ALL") {
                filteredProducts = filteredProducts.filter(
                    (product) => product.category === category
                );
            }

            if (type !== "ALL") {
                filteredProducts = filteredProducts.filter(
                    (product) => product.type === type
                );
            }

        case POST_USERS:
            return {
                ...state,
                newUser: action.payload,
            };

        case GET_USERS:
            return {
                ...state,
                user: action.payload,
            };

        case USER_BY_NAME:
            return {
                ...state,
                user: action.payload,
            };

        case UPDATE_USER:
            const updatedUser = {
                ...state.newUser,
                mail: action.payload.mail,
                password: action.payload.password,
                userName: action.payload.username,
            };
            return {
                ...state,
                newUser: updatedUser,
            };

        case USER_ORDER_ALPHABETIC:
            let copyState = [...state.user];
            let sortName;

            if (action.payload === "asc") {
                sortName = copyState.sort((a, b) =>
                    a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase())
                );
            } else if (action.payload === "desc") {
                sortName = copyState.sort((a, b) =>
                    b.fullName.toLowerCase().localeCompare(a.fullName.toLowerCase())
                );
            } else {
                return {
                    ...state,
                    user: [...state.user],
                };
            }

            return {
                ...state,
                user: sortName,
            };

        case GET_ALL_CATEGORIES:
            return {
                ...state,
                category: action.payload,
            };

        case SET_FAVORITE:
            return {
                ...state,
                favoriteProduct: action.payload,
            };
        case ADD_FAVORITE:
            const updatedFavoritesAdd = [
                ...(state.favoriteProduct || []),
                action.payload.productId,
            ];
            localStorage.setItem(
                "favoriteProduct",
                JSON.stringify(updatedFavoritesAdd)
            );
            return {
                ...state,
                favoriteProduct: updatedFavoritesAdd,
            };
        case REMOVE_FAVORITE:
            const updatedFavoritesRemove = state.favoriteProduct.filter(
                (id) => id !== action.payload.productId
            );
            localStorage.setItem(
                "favoriteProduct",
                JSON.stringify(updatedFavoritesRemove)
            );
            return {
                ...state,
                favoriteProduct: updatedFavoritesRemove,
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case ADD_TO_CART:
            return {
                ...state,
                shoppingCart: action.payload,
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                shoppingCart: action.payload,
            };

        case GET_CART_BY_ID:
            return {
                ...state,
                shoppingCart: action.payload,
            };

        case CLEAR_CART:
            return {
                ...state,
                shoppingCart: [],
            };

        default:
            return {
                ...state,
            };
    }
};

export default rootReducer;
