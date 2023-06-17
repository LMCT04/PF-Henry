import React from 'react';
import style from './cards.module.css';
const Card =(props)=>{
    return (
        <div className={style.container}>
            <div>
                <img src={props.element.image} className={style.image} alt="" />  
            </div>
            <div className={style.content} >
                <h2 className={style.h} >{props.element.name}</h2>
                <p className={style.p} >${props.element.price}</p>
                <p className={style.p} >{props.element.type}</p>
                <p className={style.p} >{props.element.category}</p>
            </div>
        </div>
    )
}
export default Card;
