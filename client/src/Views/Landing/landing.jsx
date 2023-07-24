import React from "react";
import Sliders from "../../Components/Sliders/Sliders";
import Footer from "../../Components/Footer/Footer";
import style from "./landing.module.css";
import { Box } from "@mui/material";
import Cards from "../../Components/cards/Card";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/actionsProducts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Landing = () => {
    const AllProducts = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <div className={style.container}>
            <Box
                sx={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Sliders />
            </Box>

            <Box
                sx={{
                    width: "100%",
                    height: "1000px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "70%",
                        height: "50%",
                        display: "flex",
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        gap:'20px',
                        borderRadius:'10px',
                        border:'1px solid #adb5bd',
                        marginTop:'5%'
                    }}
                >
                    <Box
                        sx={{fontWeight:'bold'}}
                    >
                        MORE POPULAR
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:'center',
                            alignItems:'center',
                            gap:'20px',
                        }}
                    >
                        {AllProducts.slice(0, 4).map((p) => (
                            <Cards key={p.id} element={p} />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </div>
    );
};

export default Landing;
