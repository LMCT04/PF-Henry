import { ORDER_AlPHABETIC,ORDER_PRICE, GET_ALL_PRODUCTS, CREATE_PRODUCT } from "./actionsType/productsAT";

const initialState={
    allProducts: [],
    product: [],
    newProduct: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_ALL_PRODUCTS:
            return {
                ...state,
                product: action.payload,
                allProducts: action.payload,
            }

      case CREATE_PRODUCT:
        return {
          ...state,
          newProduct: action.payload,
        }
        
        case ORDER_AlPHABETIC:
          let copyThree = [...state.product];
          let sortedName = action.payload === "asc"
            ? copyThree.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            : copyThree.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
          return {
            ...state,
            product: sortedName
          };

          case ORDER_PRICE:
            let priceOrder = [...state.product];
            let price = action.payload === "asc"
              ? priceOrder.sort((a, b) => a.price.toString().toLowerCase().localeCompare(b.price.toString().toLowerCase()))
              : priceOrder.sort((a, b) => b.price.toString().toLowerCase().localeCompare(a.price.toString().toLowerCase()));
            return {
              ...state,
              product: price
            };

        default:
          return state;
  }
  }
  export default  rootReducer
  