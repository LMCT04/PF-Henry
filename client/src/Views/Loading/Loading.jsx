import React from "react";
import style from "./Loading.module.css";
import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
    return (
        <div className={style.Container}>
            <CircularProgress color="success" />
        </div>
    );
}

export default Loading;
