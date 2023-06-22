import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getById } from "../../redux/actions/actionsProducts";
import style from "./detail.module.css";
import { Fab } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Loading from "../Loading/Loading";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Detail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const product = useSelector((state) => state.productDetail);
    console.log(product);

    useEffect(() => {
        dispatch(getById(id));
        // console.log(product);
        dispatch(clearState(id));
    }, [dispatch, id]);

    return (
        <div>
            {product.id ? (
                <div className={style.detail}>
                    <div className={style.detailContainer}>
                        <div className={style.name}>
                            <h1>{product.name}</h1>
                        </div>
                        <div className={style.infoContainer}>
                            <section className={style.imgContainer}>
                                <img
                                    src={product.image}
                                    alt=""
                                    className={style.img}
                                />
                            </section>
                            <section className={style.info}>
                                <h3 className={style.description}>
                                    {product.description}
                                </h3>
                                <div className={style.price}>
                                    <h1>${product.price}</h1>
                                    <Fab
                                        size="small"
                                        color="success"
                                        aria-label="add"
                                    >
                                        <AddIcon />
                                    </Fab>
                                </div>
                                <h4>{product.type}</h4>
                                <h4>{product.categories}</h4>

                                <Checkbox
                                    {...label}
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                    color="error"
                                    size="large"
                                />
                            </section>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.loading}>
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default Detail;
