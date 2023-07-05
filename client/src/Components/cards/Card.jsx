import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./cards.module.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import { addRating, getRating } from "../../redux/actions/actionsProducts";

import {
  removeFavorite,
  addFavorite,
} from "../../redux/actions/actionsProducts";

const Cards = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const currentRating = useSelector((state) => state.ratings);
  // const [rating, setRating] = useState(0);
  console.log(currentRating);

  const id = props.element.id;
  const userId = user.id;

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(id));
    }

    dispatch(getRating(id));
  }, [dispatch, id]);

  const handleFavoriteToggle = async () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites = [];
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }

    if (isFavorite) {
      favorites = favorites.filter((favoriteId) => favoriteId !== id);
      dispatch(removeFavorite(id));
    } else {
      favorites.push(id);
      dispatch(addFavorite(id));
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);

    try {
      await axios.post("http://localhost:3001/product/profile", {
        userId: userId,
        productId: id,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleRatingChange = (event, ratingValue) => {
    dispatch(addRating(id, userId, ratingValue));
  };

  return (
    <section>
      <Card
        sx={{
          width: 300,
          height: 410,
          backgroundColor: "#eddcb9",
          boxShadow: "1px 1px 3px 1px black",
        }}
      >
        <CardActionArea disableRipple>
          <CardMedia
            component="img"
            height="210"
            image={
              props.element.image && props.element.image.length > 0
                ? props.element.image[0].toString()
                : ""
            }
            alt="imagen"
            sx={{ backgroundColor: "#e4cfa5" }}
          />

          {/* {props.element.image.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="210"
              image={image}
              alt="imagen"
              sx={{ backgroundColor: "#e4cfa5" }}
            />
            Para mostrar todas las imagenes de la card
          ))} */}
          <Checkbox
            color="error"
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            size="large"
            sx={{
              position: "absolute",
              left: "240px",
              top: "150px",
              zIndex: 1,
            }}
            onClick={handleFavoriteToggle}
            checked={isFavorite}
          />
          <Link className={style.link} to={`/product/${props.element.id}`}>
            <CardContent
              sx={{
                height: 20,
                backgroundColor: "#A5CAA8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h1"
                component="div"
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "Roboto Mono, monospace",
                }}
              >
                {props.element.name}
              </Typography>
            </CardContent>
          </Link>
          <CardContent sx={{ height: 40 }}>
            <Rating
              name="size-small"
              // value={productRating}
              onChange={handleRatingChange}
              size="small"
              defaultValue={0}
              sx={{ display: "flex" }}
              max={5}
            />

            <Typography
              variant="body1"
              component="div"
              sx={{ fontSize: 35, display: "flex", alignItems: "center" }}
            >
              ${props.element.price}
            </Typography>
          </CardContent>
          <CardContent
            sx={{
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Fab size="medium" color="success" aria-label="add">
              <AddIcon />
            </Fab>
          </CardContent>
        </CardActionArea>
      </Card>
    </section>
  );
};
export default Cards;
