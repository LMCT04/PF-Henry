import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./menu.module.css";
import { getAllProducts } from '../../redux/actions/actionsProducts'
import CardsContainer from "../../Components/cardContainer/cardContainer";
import Footer from '../../Components/Footer/Footer'


const Menu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <div className={style.container} >
      <CardsContainer/>
      <Footer/>
    </div>
  );
};

export default Menu;



