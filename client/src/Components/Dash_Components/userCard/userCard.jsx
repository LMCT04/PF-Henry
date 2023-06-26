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
import React from "react";

const UserCard = ({ element }) => {
    const handleRoleChange = (e) => {
        const value = e.target.value;
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
                <CardContent sx={{ height: "100%", width: "82.5%",
                            display:'flex', flexDirection:'column'
                            }}>
                    <Box sx={{height:'50%', display:'flex'}} >
                        <Box sx={{width:'50%', display:'flex', alignItems:'center'}}>
                            <Box sx={{width:'30%', fontWeight:'bold'}}>
                                {element.fullName}
                            </Box>
                            <Box sx={{width:'35%'}} >
                                <FormControl fullWidth  >
                                    <InputLabel id="role">ROLE:</InputLabel>
                                        <Select
                                            labelId="role"
                                            id="role"
                                            value={element.role}
                                            label="Role:"
                                            onChange={handleRoleChange}
                                        >
                                            <MenuItem value={"user"}>
                                                User
                                            </MenuItem>
                                            <MenuItem value={"admin"}>
                                                Admin
                                            </MenuItem>
                                            <MenuItem value={"superAdmin"}>
                                                Super Admin
                                            </MenuItem>
                                        </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{
                                width:'40%', display:'flex',
                                alignItems:'center', justifyContent:'flex-end',
                                marginLeft:'8%', fontWeight:'bold'
                            }}
                        >
                            ID: {element.id}
                        </Box>
                    </Box>
                    <Box sx={{height:'50%', display:'flex', alignItems:'center'}}>
                        <Box sx={{marginLeft:'5%'}} >USERNAME:{element.userName}</Box>
                        <Box sx={{marginLeft:'5%'}} >MAIL:{element.mail}</Box>
                        {/*<Box sx={{marginLeft:'5%'}} >ADRESS:{element.adress}</Box>*/}
                        <Box sx={{marginLeft:'5%'}} >PASSWORD:{element.password}</Box>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserCard;
