import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NavBarDashboard = () => {

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    
    return(
        <Box
            sx={{
                width:'100%',
                height:'8vh',
                backgroundColor: '#540B0E',
                display: 'flex',
                justifyContent:'flex-end',
                alignItems: 'center'
            }}
        >
            <Button
                sx={{
                    backgroundColor:'#E09F3E',
                    marginRight:'30px',
                    color:'#540B0E',
                    fontSize: '10px',
                    transition: 'none',
                        '&:hover': {
                            backgroundColor: '#E09F3E',
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
                <MenuItem
                    sx={{
                        backgroundColor:'#9E2A2B',
                        borderBottom:'2px solid #540B0E',
                    }}
                >
                    My Account
                </MenuItem>

                <MenuItem
                    sx={{
                        backgroundColor:'#9E2A2B',
                        borderBottom:'2px solid #540B0E',
                    }}
                >
                    DashBoard
                </MenuItem>

                <MenuItem
                    sx={{
                        backgroundColor:'#9E2A2B',
                        borderBottom:'2px solid #540B0E',
                    }}
                >
                    Web Page
                </MenuItem>

                <MenuItem
                    sx={{
                        backgroundColor:'#9E2A2B',
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
};


export default NavBarDashboard;