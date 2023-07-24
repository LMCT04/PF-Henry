import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import RatingAndReview from "../RatingAndReview/RatingAndReview";
import { clearCart } from "../../redux/actions/actionsCart";


const Checkout = () => {
  const stateString = localStorage.getItem('state')
  const state = JSON.parse(stateString)
  const userId = state.user.id
  const history = useHistory()
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.allProducts);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showRatingReview, setShowRatingReview] = useState(false);
  useEffect(() => {
    const productIds = JSON.parse(localStorage.getItem("productIds"));
    const filteredProducts = allProducts?.filter((product) =>
      productIds?.includes(product.id)
    );
    setSelectedProducts(filteredProducts);

    return () => {
      localStorage.removeItem("productIds");
    };
  }, [allProducts]);
  const handleReviewClick = (productId) => {
    console.log("ID del producto:", productId);
    setSelectedProductId(productId);
    setShowRatingReview(true);
  };
  const handleClose = () => {
    setShowRatingReview(false);
  };
  const handlerDelete = () => {
     history.push("/menu")
    dispatch(clearCart(userId))
  }

  return (
    <div>
      <h3>Pago completado con éxito</h3>
      <h4>Productos comprados:</h4>
      <Grid container spacing={2}>
        {selectedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ maxWidth: 300, marginBottom: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleReviewClick(product.id)}
                >
                  Dejar una reseña
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>     
      <Button variant="contained"  onClick={handlerDelete}>
         Discover Products
      </Button>
      {showRatingReview && (
        <RatingAndReview productId={selectedProductId} onClose={handleClose} />
      )}
 
    </div>
  );
};

export default Checkout;
