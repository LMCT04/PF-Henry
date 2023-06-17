import style from './cardContainer.module.css'
import Card from '../cards/Card'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Pagination from "@mui/material/Pagination";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
        <div className={style.cardContainer} >
            <div className={style.filtersContainer} >

                <div className={style.alfContainer} >
                    <label>Alphabetic order</label>
                    <Select onChange={handleAlphabeticOrder} className={style.input} >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="asc">ASC</MenuItem>
                        <MenuItem value="desc">DESC</MenuItem>
                    </Select>
                </div>

                <div className={style.alfContainer} >
                    <label>PRICE ORDER</label>
                    <Select onChange={handlePriceOrder} className={style.input} >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="asc">ASC</MenuItem>
                        <MenuItem value="desc">DESC</MenuItem>
                    </Select>
                </div>

                <div className={style.alfContainer} >
                    <label>FILTER CATEGORY</label>
                    <Select onChange={handleFilterCategory} className={style.input} >
                        <MenuItem value="ALL">ALL</MenuItem>
                        <MenuItem value="solido">Solido</MenuItem>
                        <MenuItem value="liquido">Liquido</MenuItem>
                    </Select>
                </div>

                <div className={style.alfContainer} >
                    <label>FILTER TYPE</label>
                    <Select onChange={handleFilterType} className={style.input} >
                        <MenuItem value="ALL">ALL</MenuItem>
                        {Array.from(typesSet).map((type) => (
                            <MenuItem value={type} key={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

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
        </div>
    )
}

export default CardsContainer;