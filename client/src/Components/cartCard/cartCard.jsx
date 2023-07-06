import { CardContent, Typography, Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import style from "./cartCard.module.css";
import BotonsCart from "../BotonsCart/BotonsCart";

const CartCard = ({ element }) => {
  return (
    <div>
      <section>
        <Card
          sx={{
            width: "800px",
            height: "250px",
            backgroundColor: "#eddcb9",
            boxShadow: "1px 1px 3px 1px black",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={element.image}
            alt="imagen"
            sx={{
              backgroundColor: "#e4cfa5",
              height: "150px",
              width: "150px",
              borderRadius: "6px",
            }}
          />
          <Link className={style.link} to={`/product/${element.id}`}>
            <CardContent
              sx={{
                height: 20,
                display: "flex",
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
                {element.name}
              </Typography>
              <Typography
                variant="h1"
                component="div"
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "Roboto Mono, monospace",
                  opacity: "0.7",
                }}
              >
                (x{element.cartProducts.quantity})
              </Typography>
            </CardContent>
          </Link>

          <CardContent sx={{ height: 40 }}>
            <Typography variant="body1" component="div" sx={{ fontSize: 25 }}>
              ${element.price}
            </Typography>
          </CardContent>
         
        </Card>
        <CardContent
            sx={{
              height: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-90px",
              marginBottom: "50px"
              
            }}
          >
            <BotonsCart element={element} />
          </CardContent>
      </section>
    </div>
  );
};
export default CartCard;
