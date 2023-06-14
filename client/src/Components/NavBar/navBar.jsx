import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import style from "./navBar.module.css";

const NavBar = () => {
    const history = useHistory();

    const logout = () => {
        history.push("/login");
    };

    return (
        <div id="NavBar" className={style.navBar}>
            <div className={style.links}>
                <NavLink
                    to="/home"
                    style={(isActive) => ({
                        color: "rgb(20, 20, 20)",
                        "text-decoration": "none",
                    })}
                >
                    <h1>Logo</h1>
                </NavLink>

                <NavLink
                    to="/create"
                    style={(isActive) => ({
                        color: isActive ? "rgb(20, 20, 20)" : "rgb(71, 71, 71)",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    New Product
                </NavLink>

                <NavLink
                    to="/home"
                    style={(isActive) => ({
                        color: isActive ? "rgb(20, 20, 20)" : "rgb(71, 71, 71)",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/menu"
                    style={(isActive) => ({
                        color: isActive ? "rgb(20, 20, 20)" : "rgb(71, 71, 71)",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    Menu
                </NavLink>

                <NavLink
                    to="/about"
                    style={(isActive) => ({
                        color: isActive ? "rgb(20, 20, 20)" : "rgb(71, 71, 71)",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    About
                </NavLink>
            </div>
            {/* Esto se mueve, hay que arreglarlo para que no pase */}
            <button onClick={logout} className={style.logout}>
                Logout
            </button>
        </div>
    );
};

export default NavBar;
