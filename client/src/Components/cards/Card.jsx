import React from "react";
import style from "./cards.module.css";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'; 
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


const Card = (props) => {
    return (
        <section>
            <div className={style.container}>
                <div className={style.favCont} >
                    <Rating name="size-small" defaultValue={0} size="small" />
                </div>
                <div className={style.imageContainer} >
                    <img
                        src={props.element.image}
                        className={style.image}
                        alt=""
                    />
                </div>
                <div className={style.content}>
                    <h2 className={style.h}>{props.element.name}</h2>
                    <p className={style.p}>${props.element.price}</p>
                    <div className={style.buttons}>
                        <div className={style.more} >
                            <Fab size="small" color="success" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </div>
                        <div className={style.heart} >
                            <Checkbox 
                                color='error' 
                                icon={<FavoriteBorder />} 
                                checkedIcon={<Favorite />} 
                                size="large"
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};
export default Card;
