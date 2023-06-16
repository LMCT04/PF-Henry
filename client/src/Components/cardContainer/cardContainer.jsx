import style from './cardContainer.module.css'
import Card from '../cards/Card'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Pagination from "@mui/material/Pagination";
import Loading from '../../Views/Loading/Loading';
import { orderAlphabetic, orderPrice, filterCategory, filterType } from '../../redux/actions/actionsProducts'
import React from "react";

const CardsContainer = () => {

    const dispatch = useDispatch();

    const allProducts = useSelector((state) => state.product)

    const types = allProducts.map(product => product.type);
    const typesSet = new Set(types);

    const [pageProducts, setPageProducts] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        total: Math.ceil(allProducts.length / 12)
    });

    const handleChange = (event, value) => {
        let productsPag = [...allProducts];
        setPage(prevPage => ({ ...prevPage, current: value }));
        const startIndex = (value - 1) * 12;
        const endIndex = startIndex + 12;

        setPageProducts(productsPag.slice(startIndex, endIndex));
    };

    React.useEffect(() => {
        let productsPag = [...allProducts];
        const startIndex = (page.current - 1) * 12;
        const endIndex = startIndex + 12;
        setPageProducts(productsPag.slice(startIndex, endIndex));
        setPage(prevPage => ({ ...prevPage, total: Math.ceil(allProducts.length / 12) }));
    }, [allProducts, page.current]);

    const handleAlphabeticOrder = (e) => {
        const value = e.target.value;
        dispatch(orderAlphabetic(value));
    };

    const handlePriceOrder = (e) => {
        const value = e.target.value;
        dispatch(orderPrice(value));
    };

    const handleFilterCategory = (e) => {
        const value = e.target.value;
        dispatch(filterCategory(value));
        setPage(prevPage => ({ ...prevPage, current: 1 }));
    };

    const handleFilterType = (e) => {
        const value = e.target.value;
        dispatch(filterType(value));
        setPage(prevPage => ({ ...prevPage, current: 1 }));
    };

    return (
        <>
            <label>Alphabetic order</label>
            <select onChange={handleAlphabeticOrder}>
                <option value="default">ALPHABETIC ORDER</option>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </select>

            <label>PRICE ORDER</label>
            <select onChange={handlePriceOrder}>
                <option value="default">PRICE ORDER</option>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </select>

            <label>FILTER CATEGORY</label>
            <select onChange={handleFilterCategory}>
                <option value="ALL">ALL</option>
                <option value="solido">Solido</option>
                <option value="liquido">Liquido</option>
            </select>

            <label>FILTER TYPE</label>
            <select onChange={handleFilterType}>
                <option value="ALL">ALL</option>
                {Array.from(typesSet).map((type) => (
                    <option value={type} key={type}>
                        {type}
                    </option>
                ))}
            </select>

            <div className={style.container}>
                {pageProducts.length > 0 ? (
                    pageProducts.map((e) =>
                        <Card
                            key={e.id}
                            element={e}
                        />
                    )
                ) : (<Loading />)}
            </div>

            <Pagination
                count={page.total}
                page={page.current}
                variant="outlined"
                color="primary"
                onChange={handleChange}
                className={style.pag}
            />
        </>
    )
}

export default CardsContainer;