/* IMPORTS */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../redux/actions/actionsProducts";
import { getAllUsers } from '../../redux/actions/actionsUsers'
import { getAllCategories } from '../../redux/actions/actionsCategories'
import Form from "../Form/form";
import style from "./dashboard.module.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { Tab } from "@mui/material";
import NavBarDashboard from "../../Components/Dash_Components/navbardash/navbar";
import DashboardCardCont from "../../Components/Dash_Components/dashboardCardCont/dashboardCardCont";
import UsersContainer from "../../Components/Dash_Components/usersContainer/usersContainer";


/* COMPONENT */
const DashBoard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllUsers())
        dispatch(getAllCategories())
    }, [dispatch]);


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
                        backgroundColor: "#f8f9fa",
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                    >
                        <Tab
                            label="GESTION DE PRODUCTOS"
                            isActive={value === 0}
                            sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                            label="CREACION DE PRODUCTOS"
                            isActive={value === 1}
                            sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                            label="GESTION DE USUARIOS"
                            isActive={value === 2}
                            sx={{ fontWeight: "bold" }}
                        />
                        <Tab
                            label="GESTION DE USUARIOS"
                            isActive={value === 3}
                            sx={{ fontWeight: "bold" }}
                        />
                    </Tabs>
                </Box>
                {value === 0 && (
                    <div>
                        <DashboardCardCont />
                    </div>
                )}
                {value === 1 && (
                    <div>
                        <Form />
                    </div>
                )}
                {value === 2 && (
                    <div>
                        <UsersContainer />
                    </div>
                )}
                {value === 3 && (
                    <div>
                        hola
                    </div>
                )}
            </Box>
        </div>
    );
};

/* EXPORTS */
export default DashBoard;
