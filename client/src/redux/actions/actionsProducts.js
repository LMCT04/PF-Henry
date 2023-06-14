
import { ORDER_AlPHABETIC,ORDER_PRICE } from "../actionsType/productsAT";


export const orderAlphabetic = (payload) => {
    return {
      type: ORDER_AlPHABETIC,
      payload,
    };
  };


  export const orderPrice = (payload) => {
    return {
        type: ORDER_PRICE,
        payload,
      };
    };
