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
import RemoveIcon from "@mui/icons-material/Remove";

import {
    removeFavorite,
    addFavorite,
} from "../../redux/actions/actionsProducts";

import { addToCart, removeFromCart } from "../../redux/actions/actionsCart";

const Cards = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const shoppingCart = useSelector((state) => state.shoppingCart);
    // const favorites = useSelector((state) => state.favoriteProduct || []);
    // console.log(favorites);
    const id = props.element.id;
    const userId = user.id;
    const [quantity, setQuantity] = useState(0);
    const [count, setCount] = useState(0);

    const handleAddToCart = () => {
        setCount(count + 1);
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

    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            const favorites = JSON.parse(storedFavorites);
            setIsFavorite(favorites.includes(id));
        }
    }, [id]);

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
                            props.element.image &&
                            props.element.image.length > 0
                                ? props.element.image[0].toString()
                                : ""
                        }
                        alt="imagen"
                        sx={{ backgroundColor: "#e4cfa5" }}
                    />

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
                    <Link
                        className={style.link}
                        to={`/product/${props.element.id}`}
                    >
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
                            sx={{
                                fontSize: 35,
                                display: "flex",
                                alignItems: "center",
                            }}
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
                            gap: "20px",
                        }}
                    >
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
                    </CardContent>
                </CardActionArea>
            </Card>
        </section>
    );
};
export default Cards;
