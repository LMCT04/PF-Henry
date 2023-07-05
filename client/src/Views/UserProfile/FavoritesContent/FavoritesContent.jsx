import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../../../Components/cards/Card";
import { useSelector } from "react-redux";

import "./FavoritesContent.css";

const FavoritesContent = (props) => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const allProducts = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/product/profile/${user.id}`
        );
        const favoriteData = response.data;
        const favoriteIds = favoriteData.map((favorite) => favorite.productId);

        setFavoriteIds(favoriteIds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [favoriteIds, user.id]);

  return (
    <div>
      <h2>Favorite food</h2>
      {favoriteIds.length === 0 ? (
        <p>No se encontraron productos en favoritos</p>
      ) : favoriteIds.length > 0 ? (
        <div className="favorite-container">
          {favoriteIds.map((favoriteId) => {
            const card = allProducts.find(
              (product) => product.id === favoriteId
            );
            return <Cards key={favoriteId} element={card} />;
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FavoritesContent;
