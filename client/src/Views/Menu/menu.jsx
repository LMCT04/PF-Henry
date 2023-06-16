
/*import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderAlphabetic, orderPrice, filterCategory, filterType } from "../../redux/actions/actionsProducts";
import Loading from "../Loading/Loading";
import Card from "../../Components/cards/Card";*/

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./menu.module.css";
import { getAllProducts } from '../../redux/actions/actionsProducts'
import CardsContainer from "../../Components/cardContainer/cardContainer";
import Footer from '../../Components/Footer/Footer'


const Menu = () => {
  const dispatch = useDispatch();
  /*
  const allProducts = useSelector((state) => state.products || []);

  const types = allProducts.map(product => product.type);
  const typesSet = new Set(types);
  
  const handleAlphabeticOrder = (e) => {
    const value = e.target.value;
    dispatch(orderAlphabetic(value));
  };
  */

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const handleFilterCategory = (e) => {
    const value = e.target.value;
    dispatch(filterCategory(value));
  };

  const handleFilterType = (e) => {
    const value = e.target.value;
    dispatch(filterType(value));
  };

  return (
    <div className={style.container} >
      <CardsContainer/>
      <Footer/>
    </div>
  );
};

export default Menu;

/*
<div className={style.menuContainer}>
      <div className={style.cardContainer}>
        <label>ALPHABETIC ORDER</label>
        <select onChange={handleAlphabeticOrder}>
          <option value="default">ALPHABETIC ORDER</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        <label>PRICE ORDER</label>
        <select onChange={handlePriceOrder}>
          <option value="default">PRICE ORDER</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>

        <label>FILTER CATEGORY</label>
        <select onChange={handleFilterCategory}>
          <option value="ALL">ALL</option>
          <option value="solido">Solido</option>
          <option value="liquido">Liquido</option>
        </select>

        <label>FILTER TYPE</label>
        <select onChange={handleFilterType}>
          <option value="ALL">ALL</option>
          {Array.from(typesSet).map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>

        {allProducts.length > 0 ? (
          allProducts.map((e) => <Card key={e.id} element={e} />)
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
*/


