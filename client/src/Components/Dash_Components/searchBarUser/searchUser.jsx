import React, { useState } from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Paper, InputBase, Divider, Box } from "@mui/material";
import { getUserbyName } from "../../../redux/actions/actionsUsers";
import style from './searchUser.module.css'

const SearchUser = () => {
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    const [userFound, setUserFound] = useState(true);

    function handleInputChange(event) {
        setInput(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const result = await dispatch(getUserbyName(input));
            if (result.payload.length === 0) {
                setUserFound(false);
            } else {
                setUserFound(true);
            }
            setInput("");
        } catch (error) {
            console.log("Error:", error);
            setUserFound(false);
        }
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    }

    return (
        <Box
            sx={{
                display:'flex', flexDirection:'column'
            }}
        >
            <Paper
                component="form"
                sx={{
                    background: "transparent",
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                    border: "solid 1px #756E5C",
                }}
            >
                <InputBase 
                    sx={{ ml: 1, flex: 1 }}
                    variant="standard"
                    placeholder="Search a product:"
                    color="primary"
                    inputProps={{ "aria-label": "search a product" }}
                    onChange={handleInputChange}
                    value={input}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    component="button"
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={handleSubmit}
                    onKeyPress={handleKeyPress}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            {!userFound && <p className={style.alert} >User not Found</p>}
        </Box>
    );
};

export default SearchUser;
