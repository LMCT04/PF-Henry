import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getById } from "../../redux/actions/actionsProducts";

const Detail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const product = useSelector((state) => state.productDetail);
    console.log(product);

    useEffect(() => {
        dispatch(getById(id));
        // console.log(product);
        dispatch(clearState(id));
    }, [dispatch, id]);

    return (
        <div>
            <div>
                <h1>{product.name}</h1>
                <img src={product.image} alt="" />
                <h1>{product.description}</h1>
                <h1>{product.price}</h1>
                <h1>{product.type}</h1>
                <h1>{product.category}</h1>
            </div>
        </div>
    );
};

export default Detail;
