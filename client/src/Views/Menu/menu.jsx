import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./menu.module.css";
import { getAllProducts } from "../../redux/actions/actionsProducts";
import { getAllCategories } from "../../redux/actions/actionsCategories";
import CardsContainer from "../../Components/cardContainer/cardContainer";
import Footer from "../../Components/Footer/Footer";
import { setUser } from "../../redux/actions/actionsUsers";
import { auth } from "../../firebase/config";

const Menu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firebaseUser = auth.currentUser;

        if (firebaseUser) {
          const { displayName, email, photoURL } = firebaseUser;

          const response = await axios.get(`http://localhost:3001/user`, {
            params: {
              mail: email,
            },
          });
          const userId = response.data.id;

          const userData = {
            id: userId,
            fullName: displayName,
            userName: "",
            mail: email,
            image: photoURL,
          };

          dispatch(setUser(userData));
        }
        ///DEJAR SOLO EL PEDIDO DE ID
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <CardsContainer />
      <Footer />
    </div>
  );
};

export default Menu;
