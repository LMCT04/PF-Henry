import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DashboardCard from "../dashboardCard/dashboardCard";
import { Pagination } from "@mui/material";
import Loading from "../../Views/Loading/Loading";
import style from './dashboardCardCont.module.css'
//import Loading from "../../Views/Loading/Loading";
//import { Card, Link } from "@mui/material";

const DashboardCardCont = () => {
    // const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.product);

    
    //-------------------------PAGINADO--------------------------

    const [pageProducts, setPageProducts] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        total: Math.ceil(allProducts.length / 5),
    });

    const pageCurrentRef = useRef(page.current);

    useEffect(() => {
        const startIndex = (pageCurrentRef.current - 1) * 5;
        const endIndex = startIndex + 5;
        setPageProducts(allProducts.slice(startIndex, endIndex));
        setPage((prevPage) => ({
            ...prevPage,
            total: Math.ceil(allProducts.length / 5),
        }));
    }, [allProducts, pageCurrentRef]);

    //-------------------------HANDLES--------------------------
    const handleChange = (event, value) => {
        let productsPag = [...allProducts];
        setPage((prevPage) => ({ ...prevPage, current: value }));
        const startIndex = (value - 1) * 5;
        const endIndex = startIndex + 5;
        setPageProducts(productsPag.slice(startIndex, endIndex));
    };


    return (
        <div>
            <div>
                {pageProducts.length > 0 ? (
                    pageProducts.map((e) => (
                        <DashboardCard key={e.id} element={e} />
                    ))
                ) : (
                    <div>
                        <Loading />
                    </div>
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
        </div>
    );
};

export default DashboardCardCont;
