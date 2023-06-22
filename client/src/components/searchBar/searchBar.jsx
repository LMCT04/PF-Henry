import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/actionsProducts";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import style from "./searchBar.module.css";
import { Alert, AlertTitle, Stack } from "@mui/material";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [productFound, setProductFound] = useState(true);

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await dispatch(getByName(input));
      if (result.payload.length === 0) {
        setProductFound(false);
      } else {
        setProductFound(true);
      }
      setInput(""); // Restablecer el estado del input
    } catch (error) {
      console.log("Error:", error);
      setProductFound(false);

    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
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
      {!productFound && <p>No products found</p>}
    </div>
  );

};

export default SearchBar;
