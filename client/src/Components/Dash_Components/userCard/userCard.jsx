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
                    backgroundColor: "#ced4da",
                    borderTop:'1px solid #adb5bd'
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        height: "150px",
                        width:'150px',
                    }}
                >
                    <CardMedia
                        component="img"
                        height="100%"
                        image={element.image}
                        sx={{ borderRadius:'100px' }}
                    />
                </Box>
                <CardContent sx={{ height: "100%", width: "82.5%" }}>
                    <Box
                        sx={{
                            height: "100%",
                            backgroundColor: "#ced4da",
                            display: "flex",
                            justifyContent:'flex-start',
                            alignItems:'center'
                        }}
                    >
                        <Box
                            sx={{
                                height:'15px',
                                fontWeight:'bold',
                                marginLeft:'20px'
                            }}
                        >
                            {element.fullName}
                        </Box>
                        <Box
                            sx={{
                                height:'15px',
                                marginLeft:'40px',
                                marginRigth:'40px'
                            }}
                        >
                            {element.userName}
                        </Box>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="role">ROLE:</InputLabel>
                                    <Select
                                        labelId="role"
                                        id="role"
                                        value={element.role}
                                        label="Role:"
                                        onChange={handleRoleChange}
                                    >
                                        <MenuItem value={"user"}>User</MenuItem>
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                        <MenuItem value={"superAdmin"}>Super Admin</MenuItem>
                                    </Select>
                            </FormControl>
                        </Box>
                        {element.id}
                        {element.mail}
                        {element.password}
                        {element.adress}
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserCard;
