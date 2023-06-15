import React from "react";
import Sliders from "../../Components/Sliders/Sliders";
import Footer from "../../Components/Footer/Footer";
import style from "./Home.module.css";

const Home = () => {
    return (
        <div className={style.container}>
            <div className={style.home}>
                <Sliders />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
