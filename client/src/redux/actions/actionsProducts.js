
import { ORDER_ALPHABETIC,ORDER_PRICE, FILTER_CATEGORY, FILTER_TYPE } from "../actionsType/productsAT";

export const orderAlphabetic = (payload) => {
    return {
      type: ORDER_ALPHABETIC,
      payload,
    };
  };

export const orderPrice = (payload) => {
    return {
        type: ORDER_PRICE,
        payload,
      };
};

export const filterType = (payload) => {
      return {
          type: FILTER_TYPE,
          payload,
        };
};

export const filterCategory = (payload) => {
        return {
            type: FILTER_CATEGORY,
            payload,
          };
};
      