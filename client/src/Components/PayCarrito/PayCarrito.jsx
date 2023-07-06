import React from "react";
import axios from "axios";
import style from "./payCarrito.module.css";

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
      <button className={style.button} onClick={handleOnclickcarrito}>
        Pay Now
      </button>
    </div>
  );
}
