import React from "react";
import { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import style from "./navBar.module.css";
import logo from "../../imgAssets/logo_sin_texto.png";

import { Box, Button, Menu, MenuItem } from "@mui/material";

const NavBar = () => {
    const roleUser= JSON.parse(window.localStorage.getItem('loggedInUser'));
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLoginClick = () => {
        history.push('/login');
    };

    const handleRegisterClick = () => {
        history.push('/register');
    };

    const handleProfileClick = () => {
        history.push('/profile');
    };

    const handlePageClick = () => {
        history.push('/');
    };

    const handleDashboardClick = () => {
        history.push('/dashboard');
    };

    const handleLogOut=()=>{
        window.localStorage.setItem("loggedInUser", JSON.stringify({})); 
        history.push("/login")
        
    }

    return (
        <Box
            sx={{
                backgroundColor:'#2c6e49',
                height:'8vh',
                display:'flex',
            }}
        >
            <Box
                sx={{
                    width:'15%',
                    display:'flex',
                    justifyContent:'flex-end'
                }}
            >

                        <button className={style.logoBtn}>
                            <img src={logo} alt="logos" className={style.logo} />
                        </button>

            </Box>

            <Box
                sx={{
                    width:'25%',
                    display:'flex',
                    justifyContent:'flex-start',
                    alignItems:'center'
                }}
            >
                <NavLink
                    to="/" exact
                    className={style.navLink}
                    style={(isActive) => ({
                        fontSize: isActive ? "20px" : "20px",
                        textDecoration: isActive ? "none" : "none",
                        color: isActive ? "#fefee3" : "#4c956c",
                    })}
                >
                    HOME
                </NavLink>

                <NavLink
                    to="/menu"
                    className={style.navLink}
                    style={(isActive) => ({
                        fontSize: isActive ? "20px" : "20px",
                        textDecoration: isActive ? "none" : "none",
                        color: isActive ? "#fefee3" : "#4c956c",
                    })}
                >
                    MENU
                </NavLink>
            </Box>

            <Box
                sx={{
                    width:'60%',
                    display:'flex',
                    justifyContent:'flex-end',
                    alignItems:'center'
                }}
            >
                {!roleUser.role &&
                
                <Button
                    sx={{
                        backgroundColor:'#2c6e49',
                        border:'2px solid #fefee3',
                        color:'#fefee3',
                        '&:hover': {
                            backgroundColor:'#fefee3',
                            color:'#2c6e49',
                            fontWeight:'bold',
                        },
                        width:'10%',
                        height:'50%',
                        marginRight:'5%',
                        fontFamily:'Roboto Mono, monospace',
                        borderRadius:'25px'
                    }}
                    onClick={handleLoginClick}
                >
                    LOGIN IN
                </Button>
                }
                 {!roleUser.role &&
                <Button
                    sx={{
                        backgroundColor:'#fefee3',
                        border:'2px solid #fefee3',
                        color:'#2c6e49',
                        '&:hover': {
                            backgroundColor:'#2c6e49',
                            border:'2px solid #fefee3',
                            color:'#fefee3',
                            fontWeight:'bold',
                        },
                        width:'10%',
                        height:'50%',
                        marginRight:'5%',
                        fontFamily:'Roboto Mono, monospace',
                        borderRadius:'25px'
                    }}
                    onClick={handleRegisterClick}
                >
                    JOIN NOW
                </Button>
                }

                {(roleUser.role === "admin" || roleUser.role === "superAdmin"
                    ||roleUser.role=="user")&&
                <Button
                    sx={{
                        backgroundColor:'#fefee3',
                        border:'2px solid #fefee3',
                        color:'#2c6e49',
                        fontWeight:'bold',
                        '&:hover': {
                            backgroundColor:'#fefee3',
                            border:'2px solid #fefee3',
                            color:'#2c6e49',
                        },
                        width:'9%',
                        height:'45%',
                        marginRight:'5%',
                        fontFamily:'Roboto Mono, monospace',
                    }}
                    onClick={handleClick}
                >
                    PROFILE
                </Button>
                }

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                     {(roleUser.role === "admin" || roleUser.role === "superAdmin"
                    ||roleUser.role=="user")&&
                    <MenuItem onClick={handleProfileClick} >
                        MY ACCOUNT
                    </MenuItem>
                    }

                    { (roleUser.role === "admin" || roleUser.role === "superAdmin") &&
                    <MenuItem onClick={handleDashboardClick}>
                        DASHBOARD
                    </MenuItem>
                    }

                    <MenuItem onClick={handlePageClick}>
                        WEB PAGE
                    </MenuItem>
                    
                    {(roleUser.role === "admin" || roleUser.role === "superAdmin"
                    ||roleUser.role=="user")&&
                    <MenuItem onClick={handleLogOut}>
                        LOG OUT
                    </MenuItem>
                    }
                </Menu>
            </Box>
        </Box>
    );
};

export default NavBar;
