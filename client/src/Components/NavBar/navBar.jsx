import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import style from "./navBar.module.css";

const NavBar = () => {
    const history = useHistory();

    const logout = () => {
        history.push("/login");
    };

    return(
        <div className={style.navBar} >
            <div className={style.logoContainer} >
                <div className={style.logo} >LOGO</div>
            </div>
            <div className={style.linksContainer} >
                <NavLink 
                    to='/create' 
                    className={style.navLink}
                    style={(isActive) => ({
                        "font-size": isActive ? "30px" : "25px",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    New Product
                </NavLink>

                <NavLink 
                    to='/home' 
                    className={style.navLink}
                    style={(isActive) => ({
                        "font-size": isActive ? "40px" : "25px",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    Home
                </NavLink>

                <NavLink 
                    to='/menu' 
                    className={style.navLink}
                    style={(isActive) => ({
                        "font-size": isActive ? "40px" : "25px",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    Menu
                </NavLink>

                <NavLink 
                    to='/about' 
                    className={style.navLink}
                    style={(isActive) => ({
                        "font-size": isActive ? "40px" : "25px",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    About
                </NavLink>
            </div>
            <div className={style.logoutContainer} >
                <button onClick={logout} className={style.logout}>
                    LOGOUT
                </button>             
            </div>
        </div>
    )
/*
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
            <button onClick={logout} className={style.logout}>
                Logout
            </button>
        </div>
    );
*/
};

export default NavBar;
