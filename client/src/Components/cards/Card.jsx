import React from "react";
import style from "./cards.module.css";
const Card = (props) => {
    return (
        <section>
            <div className={style.container}>
                <div>
                    <img
                        src={props.element.image}
                        className={style.image}
                        alt=""
                    />
                </div>
                <div className={style.content}>
                    <h2 className={style.h}>{props.element.name}</h2>
                    <p className={style.p}>${props.element.price}</p>
                </div>
            </div>
        </section>
    );
};
export default Card;
