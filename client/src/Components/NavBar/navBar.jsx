import React from "react";
import { NavLink } from "react-router-dom";
import style from "./navBar.module.css";

const NavBar = () => {
    return (
        <div id="NavBar" className={style.navBar}>
            <div className={style.links}>
                <NavLink
                    to="/create"
                    style={(isActive) => ({
                        color: isActive ? "#d13017" : "#8e1300",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    New Recipe
                </NavLink>

                <NavLink
                    to="/home"
                    style={(isActive) => ({
                        color: isActive ? "#d13017" : "#8e1300",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    style={(isActive) => ({
                        color: isActive ? "#d13017" : "#8e1300",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    About
                </NavLink>
            </div>
        </div>
    );
};

export default NavBar;
