import style from './cardContainer.module.css'
import Card from '../cards/Card'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Pagination from "@mui/material/Pagination";
import Loading from '../../Views/Loading/Loading';
import { orderAlphabetic, orderPrice } from '../../redux/actions/actionsProducts'
import React from "react";

const CardsContainer = () => {

    const dispatch = useDispatch();

    const allProducts = useSelector((state ) => state.product)

    const [pageProducts, setPageProducts] = useState([]);

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        let productsPag=[...allProducts];
        setPage(value);
        const startIndex = (value - 1) * 10;
        const endIndex = startIndex + 10;
        setPageProducts(productsPag.slice(startIndex, endIndex));
    };

    React.useEffect(() => {
        let productsPag = [...allProducts];
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        setPageProducts(productsPag.slice(startIndex, endIndex));
    }, [allProducts, page]);

    const handleAlphabeticOrder = (e) => {
        const value = e.target.value;
        dispatch(orderAlphabetic(value));
    };
    
    const handlePriceOrder = (e) => {
        const value = e.target.value;
        dispatch(orderPrice(value));
    };

    return(
        <>
            <label>Alphabetic order</label>
            <select onChange={handleAlphabeticOrder}>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </select>

            <label>PRICE ORDER</label>
            <select onChange={handlePriceOrder}>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </select>

            <div className={style.container}>
                {pageProducts.length > 0 ? (
                    pageProducts.map((e) =>
                    <Card
                        key={e.id} 
                        element={e}
                    />
                    )
                ) : ( <Loading/> )}
            </div>

            <Pagination
                count={Math.ceil(allProducts.length / 10)}
                variant="outlined"
                color="primary"
                onChange={handleChange}
                className={style.pag}
            />
        </>
    )
}

export default CardsContainer