import React from 'react';
import style from './cards.module.css';
const Card =(props)=>{
  return (
    <div className={style.container}>
        <div>
         <img src={props.element.image} className={style.image} alt="" />  
        </div>
        <div>
          <h2>{props.element.name}</h2>
          <p>{props.element.price}</p>
          <p>{props.element.type}</p>
          <p>{props.element.category}</p>
        </div>
    </div>
  )
}
export default Card;
