/* IMPORTS */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../redux/actions/actionsProducts";
import SearchBar from "../../Components/searchBar/searchBar";

import style from "./dashboard.module.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
//import DashboardCard from '../../Components/dashboardCard/dashboardCard';
import NavBarDashboard from "../../Components/Dash_Components/navbardash/navbar";
import DashboardCardCont from "../../Components/Dash_Components/dashboardCardCont/dashboardCardCont";

/* COMPONENT */
const DashBoard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const CustomTab = styled(Tab)(({ theme, isActive }) => ({
        color: isActive ? "#e09f3e" : "#9e2a2b",
        "&.Mui-selected": {
            color: "#e09f3e",
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
                    height: "100vh",
                    backgroundColor: "#fff3b0",
                }}
            >
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        backgroundColor: "#335c67",
                    }}
                >
                    <Tabs value={value} onChange={handleChange}>
                        <CustomTab
                            label="PESTAÑA UNO"
                            isActive={value === 0}
                            sx={{ fontWeight: "bold" }}
                        />
                        <CustomTab
                            label="PESTAÑA DOS"
                            isActive={value === 1}
                            sx={{ fontWeight: "bold" }}
                        />
                        <CustomTab
                            label="PESTAÑA TRES"
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
                {value === 1 && <div>QUE TAL</div>}
                {value === 2 && <div>ADIOS</div>}
            </Box>
        </div>
    );
};

/* EXPORTS */
export default DashBoard;
