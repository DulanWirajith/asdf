import style from "./comingsoonsection.module.css";

export default function ComingSoonSection({ data: carouselData }) {
  return (
    <div className={style.comingSoonContainer}>
      <h1 className={style.heading}>COMING SOON</h1>
      <div className={style.imgecontainer}>
        {carouselData.map((movies, index) => (
          <div key={index} className={style.card}>
            <img
              src={movies.src}
              alt={movies.alt || "Coming Soon Movie"}
              className={style.cardImg}
            />
            <button className={style.button} onClick={null}>
              Buy Tickets
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
