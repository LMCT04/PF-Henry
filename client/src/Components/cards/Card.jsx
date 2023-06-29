import React from "react";
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
import {
  addFavorite,
  removeFavorite,
} from "../../redux/actions/actionsProducts";

const Cards = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoriteProduct);
  const id = props.element.id;
  console.log(favorites);
  console.log(id);
  const isFavorite = favorites.includes(id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
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
            checked={isFavorite}
            onChange={handleFavoriteToggle}
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
              defaultValue={0}
              size="small"
              sx={{ display: "flex" }}
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
