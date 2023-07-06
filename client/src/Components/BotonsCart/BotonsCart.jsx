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
  const roleUser = JSON.parse(window?.localStorage.getItem("loggedInUser"));

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const id = props.element.id;
  const userId = user.id;
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    const payload = {
      userId: userId,
      productId: props.element.id,
      quantity: newQuantity,
    };
    setQuantity(0);
    dispatch(addToCart(payload));
  };

  const handleRemoveFromCart = () => {
    const payload = {
      userId: userId,
      productId: props.element.id,
    };
    dispatch(removeFromCart(payload));
  };

  return (
    <div>
      {(roleUser?.role === "admin" ||
        roleUser?.role === "superAdmin" ||
        roleUser?.role == "user") && (
        <CardContent
          sx={{
            height: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Fab
            style={{ backgroundColor: "#A5CAA8" }}
            size="small"
            color="default"
            aria-label="add"
            onClick={handleRemoveFromCart}
          >
            <RemoveIcon />
          </Fab>
          <Fab
            size="small"
            color="success"
            aria-label="add"
            onClick={handleAddToCart}
          >
            <AddIcon />
          </Fab>
        </CardContent>
      )}
    </div>
  );
};
export default BotonsCart;
