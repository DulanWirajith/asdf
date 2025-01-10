import style from "./comingsoonsection.module.css";

export default function ComingSoonSection({ data: carouselData }) {
  return (
    <div>
      <div className={style.nowshowing}>
        <h1>COMING SOON</h1>
        <div className={style.imgecontainer}>
          {carouselData.map((movies, index) => {
            return (
              <div key={index} className={style.card}>
                <img
                  src={movies.src}
                  alt={movies.alt}
                  className={style.cardImg}
                />
                <button className={style.button} onClick={null}>Buy Tickets</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
