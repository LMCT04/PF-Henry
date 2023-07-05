import React from 'react'
import axios from 'axios'
import style from  "./pay.module.css"


export default function Pay(props) {
    const handleOnclick = async () =>{
      console.log(props.name,props.price);
        const params = {
            name:props.name,
            price:props.price
        }

     const url  = await axios.post('http://localhost:3001/product/pay',params)
     console.log(url.data);
   window.location.href=url.data.url
    }

     return (
    <div>
        <button  className ={style.button} onClick={handleOnclick}>Pay</button>
    </div>

  )
}