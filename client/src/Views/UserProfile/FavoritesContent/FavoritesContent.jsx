import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../../Components/cards/Card";
import "./FavoritesContent.css";

const FavoritesContent = () => {
  const favorites = useSelector((state) => state.favoriteProduct);
  const allProducts = useSelector((state) => state.product);

  return (
    <div>
      <h2>Favorite food</h2>
      <div className="favorite-container">
        {favorites.map((favoriteId) => {
          const card = allProducts.find((product) => product.id === favoriteId);
          return <Cards key={favoriteId} element={card} />;
        })}
      </div>
    </div>
  );
};

export default FavoritesContent;
