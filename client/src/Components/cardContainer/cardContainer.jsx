//------------------------IMPORTS REACT-----------------------
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//-------------------------IMPORT CSS-------------------------
import style from "./cardContainer.module.css";
//-------------------------IMPORTS MUI------------------------
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
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
        const startIndex = (page.current - 1) * 12;
        const endIndex = startIndex + 12;
        setPageProducts(filteredProducts.slice(startIndex, endIndex));
        setPage((prevPage) => ({
            ...prevPage,
            total: Math.ceil(filteredProducts.length / 12),
        }));
    
    }, [allProducts, page.current, categoryFilter, typeFilter]);

//-------------------------FILTROS--------------------------

    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");

    const types = allProducts.map((product) => product.type);
    const typesSet = new Set(types);

//-------------------------PAGINADO--------------------------
    
    const [pageProducts, setPageProducts] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        total: Math.ceil(allProducts.length / 12),
    });

//-------------------------HANDLES--------------------------

    const handleChange = (event, value) => {
        let productsPag = [...allProducts];
        setPage((prevPage) => ({ ...prevPage, current: value }));
        const startIndex = (value - 1) * 12;
        const endIndex = startIndex + 12;
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
                <SearchBar></SearchBar>
            </section>
            <div className={style.filtersAndCards}>
                <div className={style.filtersContainer}>
                    <div className={style.alfContainer}>
                        {/* <label>Alphabetic order</label> */}
                        {/* <InputLabel id="demo-simple-select-label">
                        Age
                    </InputLabel> */}

                        <Select
                            onChange={handleAlphabeticOrder}
                            className={style.input}
                            value={"age"}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="asc">ASC</MenuItem>
                            <MenuItem value="desc">DESC</MenuItem>
                        </Select>
                    </div>

                    <div className={style.alfContainer}>
                        {/* <label>PRICE ORDER</label> */}

                        <Select
                            onChange={handlePriceOrder}
                            className={style.input}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="asc">ASC</MenuItem>
                            <MenuItem value="desc">DESC</MenuItem>
                        </Select>
                    </div>

                    <div className={style.alfContainer}>
                        {/* <label>FILTER CATEGORY</label> */}

                        <Select
                            onChange={handleFilterCategory}
                            className={style.input}
                        >
                            <MenuItem value="ALL">ALL</MenuItem>
                            <MenuItem value="solido">Solido</MenuItem>
                            <MenuItem value="liquido">Liquido</MenuItem>
                        </Select>
                    </div>

                    <div className={style.alfContainer}>
                        {/* <label>FILTER TYPE</label> */}

                        <Select
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
                    </div>
                </div>
                <section className={style.cardsAndPag}>
                    <div className={style.container}>
                        {pageProducts.length > 0 ? (
                            pageProducts.map((e) => (
                                <Card key={e.id} element={e} />
                            ))
                        ) : (
                            <Loading />
                        )}
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
