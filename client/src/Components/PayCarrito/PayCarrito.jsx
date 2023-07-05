import React from "react";
import axios from "axios";
import style from "./payCarrito.module.css";
export default function PayCarrito(props) {
  const handleOnclickcarrito = async () => {
    console.log(props.params);
    const url = await axios.post(
      "http://localhost:3001/product/payCarrito",
      props.params
    );
    window.location.href = url.data.url;
  };
  return (
    <div>
      <button className={style.button} onClick={handleOnclickcarrito}>
        Pay Now
      </button>
    </div>
  );
}
