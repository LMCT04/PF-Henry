import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/actionsProducts";
import style from "./searchBar.module.css";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [input, setInput] = useState(name);

    function handleInputChange(event) {
        setInput(setName(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getByName(name));
        setInput("");
    }
    return (
        <div>
            <div className={style.searchBar}>
                <TextField
                    id="outlined-basic"
                    label="Search a product: "
                    variant="outlined"
                    value={input}
                    onChange={handleInputChange}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    Search
                </Button>
            </div>
            {/* <div className={style.container}>
                <input
                    value={input}
                    type="text"
                    placeholder="Buscar..."
                    onChange={(event) => handleInputChange(event)}
                    className={style.input}
                />
                <button
                    type="submit"
                    onClick={(event) => handleSubmit(event)}
                    className={style.boton}
                >
                    Buscar
                </button>
            </div> */}
        </div>
    );
};

export default SearchBar;
