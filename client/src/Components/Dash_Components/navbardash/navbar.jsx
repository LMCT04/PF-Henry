import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom"

const NavBarDashboard = () => {
    const history = useHistory();
    const roleUser = JSON.parse(window.localStorage.getItem("loggedInUser"));

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleProfileClick = () => {
        history.push('/profile');
    };

    const handlePageClick = () => {
        history.push('/');
    };

    const handleDashboardClick = () => {
        history.push('/dashboard');
    };
    
    return(
        <Box
            sx={{
                width:'100%',
                height:'6vh',
                backgroundColor: '#ced4da',
                display: 'flex',
                justifyContent:'flex-end',
                alignItems: 'center'
            }}
        >
            <Button
                sx={{
                    backgroundColor:'#1e88e5',
                    marginRight:'30px',
                    color:'#EDF6F9',
                    fontSize: '10px',
                    transition: 'none',
                        '&:hover': {
                            backgroundColor: '#1e88e5',
                            boxShadow: 'none',
                        }
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
                {(roleUser?.role === "admin" ||
                        roleUser?.role === "superAdmin" ||
                        roleUser?.role == "user") && (
                    <MenuItem
                        sx={{
                            backgroundColor: "#EDF6F9",
                            borderBottom: "2px solid #FFDDD2",
                        }}
                        onClick={handleProfileClick}
                    >
                        My Account
                    </MenuItem>
                        )}

                <MenuItem
                    sx={{
                        backgroundColor: "#EDF6F9",
                        borderBottom: "2px solid #FFDDD2",
                    }}
                    onClick={handleDashboardClick}
                >
                    DashBoard
                </MenuItem>

                <MenuItem
                    sx={{
                        backgroundColor: "#EDF6F9",
                        borderBottom: "2px solid #FFDDD2",
                    }}
                    onClick={handlePageClick}
                >
                    Web Page
                </MenuItem>
            </Menu>
        </Box>
    )
};


export default NavBarDashboard;