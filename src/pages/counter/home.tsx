import useHome from "./home.hook";
import "./home.styles.scss";

export default function Home() {
  const { count, handleIncrement, handleDecrement } = useHome();
  return (
    <div className="uf-home">
      <div className="uf-home__counter">{count}</div>
      <div className="uf-home__wrapper">
        <button className="uf-home__wrapper-button" onClick={handleIncrement}>
          INCREASE
        </button>
        <button className="uf-home__wrapper-button" onClick={handleDecrement}>
          DECREASE
        </button>
      </div>
    </div>
  );
}
