//  import React from "react";
//  import { useSelector, useDispatch } from "react-redux";
//  import { orderAlphabetic, orderPrice, filterType, filterCategory } from "../../redux/actions/actionsProducts";
//  import Loading from "../Loading/Loading";
//  import Card from "../../Components/cards/Card";
//  import style from "./menu.module.css";

//  const Menu = () => {
//   const dispatch = useDispatch();
//   const allProducts = useSelector((state) => state.products || []);


//   const handleAlphabeticOrder = (e) => {
//     const value = e.target.value;
//     dispatch(orderAlphabetic(value));
//    };

//    const handlePriceOrder = (e) => {
//      const value = e.target.value;
//      dispatch(orderPrice(value));
//    };

//    const handleFilterCategory = (e) => {
//      const value = e.target.value;
//      dispatch(filterCategory(value));
//    };

//    return (
//      <div className={style.cardContainer}>
//        <label>Alphabetic order</label>
//        <select onChange={handleAlphabeticOrder}>
//          <option value="asc">ASC</option>
//          <option value="desc">DESC</option>
//        </select>
//        <label>PRICE ORDER</label>
//        <select onChange={handlePriceOrder}>
//          <option value="asc">ASC</option>
//          <option value="desc">DESC</option>
//       </select>
//        <label>FILTER CATEGORY</label>
//        <select onChange={handleFilterCategory}>
//          <option value="all">ALL</option>
//          <option value="solido">Solido</option>
//          <option value="liquido">Liquido</option>

//        </select>

//       {allProducts.length > 0 ? (
//          allProducts.map((e) => <Card key={e.id} element={e} />)
//       ) : (
//         <Loading />
//       )}
//      </div>
//    );
//  };

//  export default Menu;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  orderAlphabetic,
  orderPrice,
  filterType,
  filterCategory,
} from "../../redux/actions/actionsProducts";
import Loading from "../Loading/Loading";
import Card from "../../Components/cards/Card";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import style from "./menu.module.css";

const Menu = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products || []);
  const [activeFilter, setActiveFilter] = useState(""); // Estado para almacenar el filtro activo

  const handleAlphabeticOrder = (e) => {
    const value = e.target.value;
    dispatch(orderAlphabetic(value));
  };

  const handlePriceOrder = (e) => {
    const value = e.target.value;
    dispatch(orderPrice(value));
  };

  const handleFilterCategory = (e) => {
    const value = e.target.value;
    dispatch(filterCategory(value));
    setActiveFilter(value); // Establecer el filtro activo seleccionado
  };

  return (
    <div className={style.cardContainer}>
      <FormControl>
        <InputLabel>Alphabetic order</InputLabel>
        <Select value="" onChange={handleAlphabeticOrder}>
          <MenuItem value="asc">ASC</MenuItem>
          <MenuItem value="desc">DESC</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>PRICE ORDER</InputLabel>
        <Select value="" onChange={handlePriceOrder}>
          <MenuItem value="asc">ASC</MenuItem>
          <MenuItem value="desc">DESC</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>FILTER CATEGORY</InputLabel>
        <Select value={activeFilter} onChange={handleFilterCategory}>
          <MenuItem value="all">ALL</MenuItem>
          <MenuItem value="solido">Solido</MenuItem>
          <MenuItem value="liquido">Liquido</MenuItem>
        </Select>
      </FormControl>

      {activeFilter && (
        <div>
          Filtro activo: {activeFilter}
        </div>
      )}

      {allProducts.length > 0 ? (
        allProducts.map((e) => <Card key={e.id} element={e} />)
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Menu;
