import {
    ORDER_ALPHABETIC,
    ORDER_PRICE,
    GET_ALL_PRODUCTS,
    CREATE_PRODUCT,
    FILTER_CATEGORY,
    FILTER_TYPE,
    RESET_FILTERS,
    GET_BY_NAME,
    FILTER_CATEGORY_AND_TYPE,
    GET_BY_ID,
    CLEAR_STATE,
} from "./actionsType/productsAT";

import {
    POST_USERS
} from "./actionsType/usersAT"

const initialState = {
    allProducts: [],
    product: [],
    productDetail: {},
    newProduct: {},
    newUser: {}
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
            let sortedName =
                action.payload === "asc"
                    ? copyThree.sort((a, b) =>
                        a.name
                            .toLowerCase()
                            .localeCompare(b.name.toLowerCase())
                    )
                    : copyThree.sort((a, b) =>
                        b.name
                            .toLowerCase()
                            .localeCompare(a.name.toLowerCase())
                    );
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
            const products3 = state.allProducts;
            const productFind3 = [];
            let newproduct3 = [];
            products3.forEach((product) => {
                if (product.category === action.payload)
                    productFind3.push(product);
            });

            action.payload === "ALL"
                ? (newproduct3 = products3)
                : (newproduct3 = productFind3);
            return {
                ...state,
                product: newproduct3,
            };

        case FILTER_TYPE:
            const products2 = state.allProducts;
            const productFind = [];
            let newproduct = [];
            products2.forEach((product) => {
                if (product.type.includes(action.payload))
                    productFind.push(product);
            });

            action.payload === "ALL"
                ? (newproduct = products2)
                : (newproduct = productFind);
            return {
                ...state,
                product: newproduct,
            };

        case RESET_FILTERS:
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
        case CREATE_PRODUCT:
                return {
                    ...state,
                    newUser: action.payload,
                };

        default:
            return {
                ...state,
            }
    }
};
export default rootReducer;
