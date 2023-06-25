import React from "react";
import { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import style from "./navBar.module.css";
import logo from "../../imgAssets/logo_sin_texto.png";

import { Box, Button, Menu, MenuItem } from "@mui/material";

const NavBar = () => {
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

    return (
        <Box
            sx={{
                backgroundColor:'#2c6e49',
                height:'10vh',
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
                <NavLink to="/">
                    <div className={style.logoContainer}>
                        <button className={style.logoBtn}>
                            <img src={logo} alt="logos" className={style.logo} />
                        </button>
                    </div>
                </NavLink>
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
                        fontSize: isActive ? "28px" : "22px",
                        textDecoration: isActive ? "none" : "none",
                        color: isActive ? "#FFF0C9" : "#4c956c",
                    })}
                >
                    HOME
                </NavLink>

                <NavLink
                    to="/menu"
                    className={style.navLink}
                    style={(isActive) => ({
                        fontSize: isActive ? "28px" : "22px",
                        textDecoration: isActive ? "none" : "none",
                        color: isActive ? "#FFF0C9" : "#4c956c",
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
                <Button
                    sx={{
                        backgroundColor:'#2c6e49',
                        border:'2px solid #FFF0C9',
                        color:'#FFF0C9',
                        '&:hover': {
                            backgroundColor:'#FFF0C9',
                            color:'#2c6e49',
                            fontWeight:'bold',
                        },
                        width:'10%',
                        height:'50%',
                        marginRight:'5%',
                        fontFamily:'Roboto Mono, monospace',
                        borderRadius:'10px'
                    }}
                    onClick={handleLoginClick}
                >
                    LOGIN IN
                </Button>
                <Button
                    sx={{
                        backgroundColor:'#FFF0C9',
                        border:'2px solid #FFF0C9',
                        color:'#2c6e49',
                        '&:hover': {
                            backgroundColor:'#2c6e49',
                            border:'2px solid #FFF0C9',
                            color:'#FFF0C9',
                            fontWeight:'bold',
                        },
                        width:'10%',
                        height:'50%',
                        marginRight:'5%',
                        fontFamily:'Roboto Mono, monospace',
                        borderRadius:'10px'
                    }}
                    onClick={handleRegisterClick}
                >
                    JOIN NOW
                </Button>

                <Button
                    sx={{
                        backgroundColor:'#FFF0C9',
                        border:'2px solid #FFF0C9',
                        color:'#2c6e49',
                        fontWeight:'bold',
                        '&:hover': {
                            backgroundColor:'#FFF0C9',
                            border:'2px solid #FFF0C9',
                            color:'#2c6e49',
                        },
                        width:'8%',
                        height:'35%',
                        marginRight:'5%',
                        fontFamily:'Roboto Mono, monospace',
                        borderRadius:'25px'
                    }}
                    onClick={handleClick}
                >
                    PROFILE
                </Button>
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
                    <MenuItem>
                        MY ACCOUNT
                    </MenuItem>

                    <MenuItem>
                        DASHBOARD
                    </MenuItem>

                    <MenuItem>
                        WEB PAGE
                    </MenuItem>

                    <MenuItem>
                        LOG OUT
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default NavBar;
