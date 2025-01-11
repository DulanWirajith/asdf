import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import style from "./homepagecarousel.module.css";

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
      <div className={style.carousel}>
        {/* Left Arrow */}
        <BsArrowLeftCircleFill
          className={`${style.arrow} ${style.arrowLeft}`}
          onClick={prevSlide}
        />
        
        {/* Carousel Slides */}
        {carouselData.map((item, index) => (
          <img
            src={item.src}
            alt={item.alt}
            key={index}
            className={slide === index ? style.slide : style.slideHidden}
          />
        ))}

        {/* Right Arrow */}
        <BsArrowRightCircleFill
          className={`${style.arrow} ${style.arrowRight}`}
          onClick={nextSlide}
        />
        
        {/* Indicators */}
        <div className={style.indicators}>
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlides(index)}
              className={slide === index ? style.indicator : style.indicatorinactive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
