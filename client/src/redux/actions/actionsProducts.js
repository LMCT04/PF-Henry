
import { ORDER_AlPHABETIC,ORDER_PRICE,FILTER_TYPE,FILTER_CATEGORY } from "../actionsType/productsAT";


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

           
        
    
