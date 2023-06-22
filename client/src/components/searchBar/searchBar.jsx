import React from "react";
//import Box from "@mui/material/Box";
//import TextField from "@mui/material/TextField";
//import Stack from "@mui/material/Stack";
//import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
//import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
//import DirectionsIcon from "@mui/icons-material/Directions";
//import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/actionsProducts";
import style from "./searchBar.module.css";
import { Alert, AlertTitle, Stack } from "@mui/material";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [input, setInput] = useState(name);

    function handleInputChange(event) {
        setInput(setName(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!input.length) {
            alert("Type something to search.");
        }
        dispatch(getByName(name));
        setInput("");
    }

    function handleKeyDown(event) {
        event.preventDefault();

        if (event.key === "Enter") {
            handleSubmit(event);
        }
    }

    return (
        <div className={style.searchBar}>
            <Paper
                component="form"
                sx={{
                    background: "transparent",
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                    height: 35,
                    border: "solid 1px #756E5C",
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    variant="standard"
                    placeholder="Search a product:"
                    color="primary"
                    inputProps={{ "aria-label": "search a product" }}
                    value={input}
                    onChange={handleInputChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={handleSubmit}
                    onKeyDown={handleKeyDown}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            {/* <div className={style.searchBar}>
                <TextField
                    id="outlined-basic"
                    label="Search a product: "
                    // variant="outlined"
                    variant="standard"
                    value={input}
                    onChange={handleInputChange}
                    className={style.input}
                />
                <Button
                    // size="lg"
                    variant="plain"
                    onClick={handleSubmit}
                    size="large"
                >
                    <svg data-testid="SearchIcon"></svg>
                </Button>
            </div> */}
        </div>
    );
};

export default SearchBar;
