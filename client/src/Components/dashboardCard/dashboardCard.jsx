import React, { useState } from "react";
//import style from "./dashoardCard.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";

const DashboardCard = (props) => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Card
            sx={{
                border: "2px solid black",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFF3B0",
                height: "118px",
                width: "1003px",
            }}
        >
            <CardMedia
                component="img"
                height="98%"
                image={props.element.image}
                sx={{ width: "12%", backgroundColor: "red" }}
            />
            <CardContent sx={{ height: "100%", width: "80%" }}>
                <Box sx={{ border: "1px solid black", height: "20%" }}>
                    {props.element.name}
                </Box>
                <Box sx={{ border: "1px solid black", height: "80%" }}>
                    {props.element.price}
                    {props.element.description}
                    {props.element.type}
                    {props.element.category}
                </Box>
            </CardContent>
            <CardContent
                sx={{
                    border: "2px solid black",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    width: "8%",
                }}
            >
                {" "}
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                />{" "}
            </CardContent>
        </Card>
    );
};

export default DashboardCard;
