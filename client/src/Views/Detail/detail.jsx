import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getById } from "../../redux/actions/actionsProducts";
import veganImg from "../../imgAssets/vegan.png";
import dairyFreeImg from "../../imgAssets/dairy-free.png";
import glutenFreeImg from "../../imgAssets/gluten-free.png";
import {
    Grid,
    Box,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "./detail.css";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.productDetail);
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        dispatch(getById(id));
        dispatch(clearState(id));
    }, [dispatch, id]);

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    return (
        <Box
            display="flex"
            flexDirection="row"
            className="container"
            sx={{ backgroundColor: "re#fefee3", height:'74.97vh' }}
        >
            {product.id ? (
                <>
                    <Box className="img-container">
                        <img
                            src={product.image[0][0].substring(1, product.image[0][0].length - 1)} //{props.element.image} antes era asi}
                            alt={product.name}
                            className="img"
                        />
                    </Box>
                    <Box className="detail-container">
                        <Box display="flex" className="name-favorite">
                            <Typography variant="h4" className="name">
                                {product.name}
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<FavoriteBorderIcon />}
                                        checkedIcon={<FavoriteIcon />}
                                        color="error"
                                        size="large"
                                    />
                                }
                                label="Add to Favorites"
                            />{" "}
                        </Box>

                        <Typography variant="h5" className="price">
                            ${product.price}
                        </Typography>
                        <Typography variant="h5" className="description">
                            {product.description}
                        </Typography>
                        <Box
                            display="flex"
                            sx={{ width: "40px", height: "40px" }}
                            className="categories"
                        >
                            {product.categories.map((category, index) => (
                                <img
                                    key={index}
                                    src={getCategoryImage(category)}
                                    alt={category}
                                />
                            ))}
                        </Box>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <IconButton onClick={handleDecrease}>
                                    <RemoveCircleOutlineIcon
                                        sx={{ width: "40px", height: "40px" }}
                                    />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">
                                    {quantity}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleIncrease}>
                                    <AddCircleOutlineIcon
                                        sx={{ width: "40px", height: "40px" }}
                                    />
                                </IconButton>
                            </Grid>
                            <Box
                                display="flex"
                                alignItems="center"
                                marginLeft={5}
                            >
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    startIcon={<AddIcon />}
                                >
                                    Add to Cart
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                </>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                >
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default Detail;

const getCategoryImage = (categoryName) => {
    // Asignar la imagen correspondiente según el nombre de la categoría
    if (categoryName === "Sin Tacc") {
        return glutenFreeImg;
    } else if (categoryName === "Sin Lactosa") {
        return dairyFreeImg;
    } else if (categoryName === "Vegano") {
        return veganImg;
    }
};
