import React from "react";
import style from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import fbLogo from "../../imgAssets/rrss logos/fb.png";
import twLogo from "../../imgAssets/rrss logos/twitter.png";
import igLogo from "../../imgAssets/rrss logos/ig.png";
import ytLogo from "../../imgAssets/rrss logos/yt.png";
import cafeLogo from "../../imgAssets/Recurso-11.png";

const Footer = () => {
    return (
        <section>
            <div className={style.Container}>
                <div className={style.footerContainer}>
                    <section className={style.info}>
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
                            <div className={style.infoFooterRedes}>
                                <h2>Seguinos en:</h2>
                                <div>
                                    <button className={style.logoBtn}>
                                        <img
                                            src={fbLogo}
                                            alt="Fb"
                                            className={style.logo}
                                        />
                                    </button>
                                    <button className={style.logoBtn}>
                                        <img
                                            src={igLogo}
                                            alt="Fb"
                                            className={style.logo}
                                        />
                                    </button>
                                    <button className={style.logoBtn}>
                                        <img
                                            src={twLogo}
                                            alt="Fb"
                                            className={style.logo}
                                        />
                                    </button>
                                    <button className={style.logoBtn}>
                                        <img
                                            src={ytLogo}
                                            alt="Fb"
                                            className={style.logo}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <NavLink
                            to="/home"
                            style={(isActive) => ({
                                color: "rgb(20, 20, 20)",
                                "text-decoration": isActive && "none",
                            })}
                        >
                            <img
                                src={cafeLogo}
                                alt="cafeLogo"
                                className={style.cafeLogo}
                            />
                        </NavLink>
                    </section>
                </div>
                <section className={style.copyRight}>
                    <p>©2023 CeliacTeam. All rights reserved</p>
                </section>
            </div>
        </section>
    );
};

export default Footer;
