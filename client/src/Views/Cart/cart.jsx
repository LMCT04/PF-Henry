import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCartById } from "../../redux/actions/actionsCart";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { Button, Box, CardContent, Typography } from "@mui/material";
import CartCard from "../../Components/cartCard/cartCard";
import style from "./Cart.module.css";
import PayCarrito from "../../Components/PayCarrito/PayCarrito"
const Cart = () => {
    let { userId } = useParams();
    const dispatch = useDispatch();
    let shoppingCart = useSelector((state) => state.shoppingCart);

    useEffect(() => {
        dispatch(getCartById(userId));
    }, [dispatch]);

    return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "100px",
                }}
            >
                <Box
                    sx={{
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        backgroundColor: "#ffefcf",
                        gap: "30px",
                    }}
                >
                    {shoppingCart?.cart?.products?.length > 0 ? (
                        shoppingCart.cart.products.map((e) => (
                            <CartCard key={e.id} element={e} />
                        ))
                    ) : (
                        <div className={style.loading}>
                            <Loading />
                        </div>
                    )}
                </Box>

                <Box
                    sx={{
                        marginTop: "30px",
                        backgroundColor: "#eddcb9",
                        height: "150px",
                        width: "360px",
                        borderRadius: "6px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        padding: "50px",
                        gap: "20px",
                        boxShadow: "1px 1px 3px 1px black",
                        position: "sticky",
                        top: "32px",
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            alignItems: "flex-starts",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-starts",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                variant="body1"
                                component="div"
                                sx={{
                                    fontSize: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: "0.8",
                                }}
                            >
                                Products:
                            </Typography>
                            <Typography
                                variant="body1"
                                component="div"
                                sx={{
                                    fontSize: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: "0.8",
                                }}
                            >
                                ({shoppingCart?.cart?.quantity})
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-starts",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                variant="body1"
                                component="div"
                                sx={{
                                    fontSize: 30,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Total:
                            </Typography>
                            <Typography
                                variant="body1"
                                component="div"
                                sx={{
                                    fontSize: 30,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                ${shoppingCart?.cart?.totalPrice}
                            </Typography>
                        </Box>
                    </CardContent>
                   <PayCarrito params={shoppingCart?.cart?.products}></PayCarrito>
                </Box>
            </Box>
    );
};

export default Cart;
