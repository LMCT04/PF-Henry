import {
    Card,
    CardContent,
    CardMedia,
    Box,
    FormControl,
    Select,
    InputLabel,
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
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#eddcb9",
                    boxShadow: "1px 1px 3px 1px black",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "200px",
                    }}
                >
                    <CardMedia
                        component="img"
                        height="70%"
                        image={element.image}
                        sx={{ width: "100%", backgroundColor: "red" }}
                    />
                    <Box
                        sx={{
                            marginTop: "5%",
                            marginBottom: "5%",
                        }}
                    >
                        {element.userName}
                    </Box>
                </Box>
                <CardContent sx={{ height: "100%", width: "82.5%" }}>
                    <Box
                        sx={{
                            height: "20%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "yellow",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "green",
                            }}
                        >
                            {element.fullName}
                        </Box>
                        <Box>
                            <FormControl fullWidth>
                                {/* <InputLabel id="role">ROLE:</InputLabel>
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
                                    </Select> */}
                            </FormControl>
                        </Box>
                    </Box>
                    

                    <Box
                        sx={{
                            height: "80%",
                            backgroundColor: "blue",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
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
