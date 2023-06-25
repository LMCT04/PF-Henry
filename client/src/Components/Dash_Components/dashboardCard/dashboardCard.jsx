import React, { useState } from "react";
//import style from "./dashoardCard.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const DashboardCard = (props) => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent:'center',
                backgroundColor: "#EDF6F9",
                height: "auto",
                width: "100%",
                borderBottom:'5px solid #FFDDD2'
            }}
        >
            <CardMedia
                component="img"
                height="90%"
                image={props.element.image}
                sx={{ width: "8.5%", backgroundColor: "red" }}
            />
            <CardContent sx={{ height: "100%", width: "82.5%" }}>
                <Box sx={{ color: "#343A40", height: "20%", fontWeight:'bold'}}>
                    {props.element.name}
                </Box>
                <Box sx={{height: "80%" ,display:'flex'}}>
                    <Box sx={{width: "50%"}}>
                        <Box sx={{}} >
                            {props.element.type}:
                            {props.element.categories}
                        </Box>
                        <Accordion sx={{margin: '1%'}} >
                            <AccordionSummary>
                                DESCRIPTION
                            </AccordionSummary>
                            <AccordionDetails>
                                {props.element.description}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{width: "50%"}}>
                        {props.element.price}
                    </Box>
                </Box>
            </CardContent>
            <CardContent
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:'center',
                    width: "3.5%",
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
