import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderAlphabetic, orderPrice } from "../../redux/actions/actionsProducts";
import Loading from "../Loading/Loading";
import Card from "../../Components/cards/Card";
import style from "./menu.module.css";
import Footer from "../../Components/Footer/Footer";
import { getAllProducts } from '../../redux/actions/actionsProducts'

const Menu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const allP = useSelector((state ) => state.product)

  //const allProducts = useSelector((state) => state.products || []);

  const handleAlphabeticOrder = (e) => {
    const value = e.target.value;
    dispatch(orderAlphabetic(value));
  };

  const handlePriceOrder = (e) => {
    const value = e.target.value;
    dispatch(orderPrice(value));
  };

  return (
    <div className={style.menuContainer} >
      <div className={style.cardContainer}>
        <label>Alphabetic order</label>
        <select onChange={handleAlphabeticOrder}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        <label>PRICE ORDER</label>
        <select onChange={handlePriceOrder}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>

        {allP.length > 0 ? (
          allP.map((e) => <Card key={e.id} element={e} />)
        ) : (
          <Loading />
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Menu;
