import {
    Card,
    CardContent,
    CardMedia,
    Box,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { roleUpdate } from "../../../redux/actions/actionsUsers";
import { useDispatch } from "react-redux";


const UserCard = ({ element }) => {
    const roleUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
    const [selectedRole, setSelectedRole] = useState(element.role);
    const dispatch = useDispatch();

    const handleRoleChange = (e) => {
        const value = e.target.value;
        setSelectedRole(value);
        dispatch(roleUpdate(element.mail, value));
    };

    return (
        <div>
            <Card
                sx={{
                    width: "100%",
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#EDF6F9",
                    borderTop: "5px solid #FFDDD2",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        height: "150px",
                        width: "150px",
                    }}
                >
                    <CardMedia
                        component="img"
                        height="100%"
                        image={element.image}
                        sx={{ borderRadius: "100px" }}
                    />
                </Box>
                <CardContent
                    sx={{
                        height: "100%",
                        width: "82.5%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ height: "50%", display: "flex" }}>
                        <Box
                            sx={{
                                width: "50%",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{ width: "30%", fontWeight: "bold" }}>
                                {element.fullName}
                            </Box>
                            <Box sx={{ width: "35%", height:'70px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                {(roleUser?.role == "superAdmin")&&(<FormControl sx={{width:'60%'}} >
                                    <InputLabel id="role">ROLE:</InputLabel>
                                    <Select
                                        labelId="role"
                                        id="role"
                                        value={selectedRole}
                                        label="Role:"
                                        onChange={handleRoleChange}
                                        sx={{height:'40px'}}
                                    >
                                        <MenuItem value={"user"}>User</MenuItem>
                                        <MenuItem value={"admin"}>
                                            Admin
                                        </MenuItem>
                                    </Select>
                                </FormControl>)}
                                {(roleUser?.role == "admin")&&
                                (<Box sx={{border:'1px solid grey', width:'60%', height:'40px', 
                                            borderRadius:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center'}} >
                                        {element.role}
                                </Box>)}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "40%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                marginLeft: "8%",
                                fontWeight: "bold",
                            }}
                        >
                            ID: {element.id}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            height: "50%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ marginLeft: "5%" }}>
                            USERNAME:{element.userName}
                        </Box>
                        <Box sx={{ marginLeft: "5%" }}>MAIL:{element.mail}</Box>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserCard;
