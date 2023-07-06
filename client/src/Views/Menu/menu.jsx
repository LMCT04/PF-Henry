import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./menu.module.css";
import { getAllProducts } from "../../redux/actions/actionsProducts";
import { getAllCategories } from "../../redux/actions/actionsCategories";
import CardsContainer from "../../Components/cardContainer/cardContainer";
import Footer from "../../Components/Footer/Footer";
import { setUser } from "../../redux/actions/actionsUsers";
import { auth } from "../../firebase/config";
import { getCartById } from "../../redux/actions/actionsCart";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userId = user.id;

  useEffect(() => {
    dispatch(getCartById(userId));
  }, []);

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
          const userName = response.data.userName;

          const userData = {
            id: userId,
            fullName: displayName,
            userName: userName,
            mail: email,
            image: photoURL,
          };

          dispatch(setUser(userData));
        }
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
