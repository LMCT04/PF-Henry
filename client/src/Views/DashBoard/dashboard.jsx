/* IMPORTS */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../redux/actions/actionsProducts";

import style from "./dashboard.module.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavBarDashboard from "../../Components/Dash_Components/navbardash/navbar";
import DashboardCardCont from "../../Components/Dash_Components/dashboardCardCont/dashboardCardCont";

/* COMPONENT */
const DashBoard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const CustomTab = styled(Tab)(({ theme, isActive }) => ({
        color: isActive ? "#006D77" : "#83C5BE",
        "&.Mui-selected": {
            color: "#006D77",
        },
        
    }));

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={style.background}>
            <NavBarDashboard />
            <Box
                sx={{
                    width: "100%",
                    height: "70vh",
                    backgroundColor: "#B8DEDC",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        backgroundColor: "#FFDDD2",
                    }}
                >
                    <Tabs
                        value={value} 
                        onChange={handleChange}
                        indicatorColor="primary"
                    >
                        <CustomTab
                            label="GESTION DE PRODUCTOS"
                            isActive={value === 0}
                            sx={{ fontWeight: "bold" }}
                        />
                        <CustomTab
                            label="CREACION DE PRODUCTOS"
                            isActive={value === 1}
                            sx={{ fontWeight: "bold" }}
                        />
                        <CustomTab
                            label="GESTION DE USUARIOS"
                            isActive={value === 2}
                            sx={{ fontWeight: "bold" }}
                        />
                    </Tabs>
                </Box>
                {value === 0 && (
                    <div>
                        <DashboardCardCont />
                    </div>
                )}
                {value === 1 && <div></div>}
                {value === 2 && <div>ADIOS</div>}
            </Box>
        </div>
    );
};

/* EXPORTS */
export default DashBoard;
