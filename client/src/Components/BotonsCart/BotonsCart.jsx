import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  addToCart,
  getCartById,
  removeFromCart,
} from "../../redux/actions/actionsCart";

const BotonsCart = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const id = props.element.id;
  const userId = user.id;
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    dispatch(getCartById(userId));
    // setCount(count + 1);
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    const payload = {
      userId: userId,
      productId: props.element.id,
      quantity: newQuantity,
    };
    setQuantity(0);
    dispatch(addToCart(payload));
    // alert("Added to Cart");
  };

  const handleRemoveFromCart = () => {
    setCount(count + 1);

    const payload = {
      userId: userId,
      productId: props.element.id,
    };
    dispatch(removeFromCart(payload));
  };

  return (
    <div>
      <Fab
        style={{ backgroundColor: "#A5CAA8" }}
        size="medium"
        color="default"
        aria-label="add"
        onClick={handleRemoveFromCart}
      >
        <RemoveIcon />
      </Fab>
      <Fab
        size="medium"
        color="success"
        aria-label="add"
        onClick={handleAddToCart}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};
export default BotonsCart;
