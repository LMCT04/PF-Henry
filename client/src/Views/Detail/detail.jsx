import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getById } from "../../redux/actions/actionsProducts";
import style from "./detail.module.css";

const Detail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const product = useSelector((state) => state.productDetail);
    console.log(product);

    useEffect(() => {
        dispatch(getById(id));
        console.log(product);
        dispatch(clearState(id));
    }, [dispatch, id, product]);


    return (
        <div>
            <div>
                <h1>{product.name}</h1>
            </div>
        </div>
    );
}

export default Detail;
