//------------------------IMPORTS REACT-----------------------
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//-------------------------IMPORT CSS-------------------------
import style from "./cardContainer.module.css";
//-------------------------IMPORTS MUI------------------------
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

//---------------------IMPORTS COMPONENTS---------------------
import Card from "../cards/Card";
import Loading from "../../Views/Loading/Loading";
import SearchBar from "../searchBar/searchBar";
//---------------------IMPORTS ACTIONS------------------------
import {
    orderAlphabetic,
    orderPrice,
    filterCategoryAndType,
} from "../../redux/actions/actionsProducts";
//-------------------------COMPONENT--------------------------

const CardsContainer = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.product);

    //-------------------------FILTROS--------------------------

    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");

    const types = allProducts.map((product) => product.type);
    const typesSet = new Set(types);

    //-------------------------PAGINADO--------------------------

    const [pageProducts, setPageProducts] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        total: Math.ceil(allProducts.length / 15),
    });

    useEffect(() => {
        let filteredProducts = [...allProducts];
        // Filtrar por categoría
        if (categoryFilter !== "ALL") {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === categoryFilter
            );
        }
        // Filtrar por tipo
        if (typeFilter !== "ALL") {
            filteredProducts = filteredProducts.filter(
                (product) => product.type === typeFilter
            );
        }
        const startIndex = (page.current - 1) * 15;
        const endIndex = startIndex + 15;
        setPageProducts(filteredProducts.slice(startIndex, endIndex));
        setPage((prevPage) => ({
            ...prevPage,
            total: Math.ceil(filteredProducts.length / 15),
        }));
    }, [allProducts, page.current, categoryFilter, typeFilter]);

    //-------------------------HANDLES--------------------------

    const handleChange = (event, value) => {
        let productsPag = [...allProducts];
        setPage((prevPage) => ({ ...prevPage, current: value }));
        const startIndex = (value - 1) * 15;
        const endIndex = startIndex + 15;
        setPageProducts(productsPag.slice(startIndex, endIndex));
    };

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
        setPage((prevPage) => ({ ...prevPage, current: 1 }));
        setCategoryFilter(value);
        dispatch(filterCategoryAndType(value, typeFilter));
    };

    const handleFilterType = (e) => {
        const value = e.target.value;
        setPage((prevPage) => ({ ...prevPage, current: 1 }));
        setTypeFilter(value);
        dispatch(filterCategoryAndType(categoryFilter, value));
    };

    //-------------------------RENDERIZACION--------------------------

    return (
        <div className={style.cardContainer}>
            <section>
                <SearchBar className={style.search}></SearchBar>
            </section>
            <div className={style.filtersAndCards}>
                <div className={style.filtersContainer}>
                    <div className={style.alfContainer}>
                        <FormControl fullWidth>
                            {/* <label>ALPHABETIC ORDER</label> */}
                            <InputLabel id="alphabetic">A - Z</InputLabel>

                            <Select
                                labelId="alphabetic"
                                id="alphabetic"
                                onChange={handleAlphabeticOrder}
                                label="A - Z"
                                className={style.input}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="asc">A - Z</MenuItem>
                                <MenuItem value="desc">Z - A</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={style.alfContainer}>
                        <FormControl fullWidth>
                            {/* <label>PRICE ORDER</label> */}
                            <InputLabel id="price">PRICE</InputLabel>
                            <Select
                                labelId="price"
                                id="price"
                                onChange={handlePriceOrder}
                                label="PRICE"
                                className={style.input}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="asc">ASC</MenuItem>
                                <MenuItem value="desc">DESC</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={style.alfContainer}>
                        <FormControl fullWidth>
                            {/* <label>FILTER CATEGORY</label> */}
                            <InputLabel id="category">CATEGORY</InputLabel>

                            <Select
                                labelId="category"
                                id="category"
                                label="CATEGORY"
                                onChange={handleFilterCategory}
                                className={style.input}
                            >
                                <MenuItem value="ALL">ALL</MenuItem>
                                <MenuItem value="solido">Solido</MenuItem>
                                <MenuItem value="liquido">Liquido</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={style.alfContainer}>
                        <FormControl fullWidth>
                            {/* <label>FILTER TYPE</label> */}
                            <InputLabel id="type">TYPE</InputLabel>

                            <Select
                                labelId="type"
                                id="type"
                                label="TYPE"
                                onChange={handleFilterType}
                                className={style.input}
                            >
                                <MenuItem value="ALL">ALL</MenuItem>
                                {Array.from(typesSet).map((type) => (
                                    <MenuItem value={type} key={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <section className={style.cardsAndPag}>
                    <div className={style.centradoDeCards}>
                        <div className={style.container}>
                            {pageProducts.length > 0 ? (
                                pageProducts.map((e) => (
                                    <Card key={e.id} element={e} />
                                ))
                            ) : (
                                <Loading />
                            )}
                        </div>
                    </div>

                    <Pagination
                        count={page.total}
                        page={page.current}
                        variant="outlined"
                        showFirstButton
                        showLastButton
                        onChange={handleChange}
                        className={style.pag}
                    />
                </section>
            </div>
        </div>
    );
};

export default CardsContainer;
