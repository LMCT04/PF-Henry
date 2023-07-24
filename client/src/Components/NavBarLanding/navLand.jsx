import React from "react";
import { NavLink } from "react-router-dom";
import style from "./navLand.module.css";
import logo from "../../imgAssets/logo_sin_texto.png";

const NavLand = () => {

    return (
        <div className={style.navBar}>
            <div className={style.logoContainer}>
                    <button className={style.logoBtn}>
                <NavLink to="/home">
                        <img src={logo} alt="logos" className={style.logo} />
                </NavLink>
                    </button>
            </div>

            <div className={style.buttonsCont} >
                <div className={style.btn} >
                    <NavLink to='/login' >
                        <button className={style.buttons} >
                            LOGIN IN
                        </button>
                    </NavLink>
                </div>

                <div className={style.btn} >
                    <NavLink to='/register' >
                        <button className={style.buttons1} >
                            JOIN NOW
                        </button>
                    </NavLink>
                </div>

            </div>
        </div>
    );
};

export default NavLand;
