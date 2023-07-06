import React from "react";
import axios from "axios";
import style from "./payCarrito.module.css";
import { Button, Box, CardContent, Typography } from "@mui/material";


export default function PayCarrito(props) {
  const { params } = props;
  // const history = useHistory();

  const handleOnclickcarrito = async () => {
    const productIds = params.map((product) => product.id);

    const url = await axios.post(
      "http://localhost:3001/product/payCarrito",
      props.params
    );
    window.location.href = url.data.url;
    localStorage.setItem("productIds", JSON.stringify(productIds));
  };
  return (
    <div>
      <Button
        
        variant="contained"
        color="success"
        fullWidth
        sx={{
          minWidth: "100%",
        }}
        onClick={handleOnclickcarrito}
      >
        Pay Now
      </Button>
    </div>
  );
}
