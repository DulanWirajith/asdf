import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import style from "./homepagecarousel.module.css";
import { useState } from "react";

export default function HomePageCarousel({ data: carouselData }) {
  const [slide, setSlides] = useState(0);

  const nextSlide = () => {
    setSlides(slide === carouselData.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlides(slide === 0 ? carouselData.length - 1 : slide - 1);
  };

  return (
    <div className={style.carouselContainer}>
      <div className={style.carouselContainer}>
        <div className={style.carousel}>
          <BsArrowLeftCircleFill
            style={{
              position: "absolute",
              filter: "drop-shadow(0px 0px 5px #555)",
              width: "2rem",
              height: "2rem",
              color: "white",
              cursor: "pointer",
              marginTop: "200px",
            }}
            className={style.arrowLeft}
            onClick={prevSlide}
          />
          {carouselData.map((items, index) => {
            return (
              <img
                src={items.src}
                alt={items.alt}
                key={index}
                className={
                  slide === index ? `${style.slide}` : `${style.slideHidden}`
                }
              />
            );
          })}
          <BsArrowRightCircleFill
            style={{
              position: "absolute",
              filter: "drop-shadow(0px 0px 5px #555)",
              width: "2rem",
              height: "2rem",
              color: "white",
              cursor: "pointer",
              marginTop: "200px",
            }}
            className={style.arrowRight}
            onClick={nextSlide}
          />
          <span className={style.indicators}>
            {carouselData.map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setSlides(index)}
                  className={
                    slide === index
                      ? `${style.indicator}`
                      : `${style.indicatorinactive}`
                  }
                ></button>
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
