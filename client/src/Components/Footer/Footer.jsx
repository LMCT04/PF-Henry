import React from "react";
import style from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div className={style.footerContainer}>
            <div className={style.infoFooter}>
                <h2>Dirección:</h2>
                <h4>Lugar Random</h4>
            </div>
            <div className={style.infoFooter}>
                <h2>Contacto:</h2>
                <h4>0800-4840539</h4>
            </div>
            <div className={style.infoFooter}>
                <h2>Horarios:</h2>
                <h4>De 09:00 a 22:00</h4>
            </div>
            <div className={style.infoFooter}>
                <h2>Seguinos en:</h2>
                <h4>Fb Ig Tw Yt</h4>
            </div>
            <NavLink
                to="/home"
                style={(isActive) => ({
                    color: "rgb(20, 20, 20)",
                    "text-decoration": isActive && "none",
                })}
            >
                <h1>Logo</h1>
            </NavLink>
        </div>
    );
};

export default Footer;
