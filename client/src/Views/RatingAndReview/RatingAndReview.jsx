import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRatingAndReview } from "../../redux/actions/actionsProducts";
import { Card, CardContent, Typography, Button, Rating } from "@mui/material";
import "./RatingAndReview.css";

const RatingAndReview = ({ productId, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userId = user ? user.id : null;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      dispatch(addRatingAndReview(productId, userId, rating, review));
      setRating(0);
      setReview("");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Puntuación y Reseña
            </Typography>
            <div>
              <Typography variant="body1" component="label">
                Calificación:
              </Typography>
              <Rating
                name="product-rating"
                value={rating}
                onChange={handleRatingChange}
              />
            </div>
            <div>
              <Typography variant="body1" component="label">
                Reseña:
              </Typography>
              <textarea value={review} onChange={handleReviewChange} />
            </div>
            <Button variant="contained" onClick={handleSubmit}>
              Enviar
            </Button>
          </CardContent>
        </Card>
        <Button variant="contained" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default RatingAndReview;
