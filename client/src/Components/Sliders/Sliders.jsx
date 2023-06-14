import React, { useState } from "react";
import style from "./Sliders.module.css";

const Sliders = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidePosition, setSlidePosition] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Slide 1",
            content: "Contenido del slide 1",
        },
        {
            id: 2,
            title: "Slide 2",
            content: "Contenido del slide 2",
        },
        {
            id: 3,
            title: "Slide 3",
            content: "Contenido del slide 3",
        },
    ];

    const handleNextSlide = () => {
        setCurrentSlide(
            currentSlide === slides.length - 1 ? 0 : currentSlide + 1
        );
        console.log(currentSlide);
    };

    const handlePrevSlide = () => {
        setCurrentSlide(
            currentSlide === 0 ? slides.length - 1 : currentSlide - 1
        );
        console.log(currentSlide);
    };

    const handleSlidePosition = (event) => {
        const position = event.target.value;
        setCurrentSlide(Number(position)); 
        setSlidePosition(position);
        
        console.log(slidePosition);
        console.log(currentSlide);
    };

    return (
        <div className={style.container}>
            <div className={style.slidesContainer}>
                <button onClick={handlePrevSlide} className={style.slideBtn}>Anterior</button>
                <div className={style.slides}>
                    <h2>{slides[currentSlide].title}</h2>
                    <p>{slides[currentSlide].content}</p>
                    <div className="buttons"></div>
                </div>
                <button onClick={handleNextSlide} className={style.slideBtn}>Siguiente</button>
            </div>
            <div className={style.slidePositionContainer}>
                <button
                    onClick={handleSlidePosition}
                    className={
                        currentSlide === 0
                            ? style.selectedSlide
                            : style.oderSlide
                    }
                    value={0}
                ></button>
                <button
                    onClick={handleSlidePosition}
                    className={
                        currentSlide === 1
                            ? style.selectedSlide
                            : style.oderSlide
                    }
                    value={1}
                ></button>
                <button
                    onClick={handleSlidePosition}
                    className={
                        currentSlide === 2
                            ? style.selectedSlide
                            : style.oderSlide
                    }
                    value={2}
                ></button>
            </div>
        </div>
    );

    // return (
    //     <div className={style.slidesContainer}>
    //         <h1 >Slides</h1>
    //     </div>
    // );
};

export default Sliders;
