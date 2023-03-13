import Pan from "../../assets/Pan.png";
import Fire from "../../assets/flame.gif";

const LoadingAnimation = () => {
  return (
    <div id="loadingPage">
      <div id="loadingBasket"></div>
      <div id="loadingPan">
        <img src={Pan} alt="cooking skillet" />
      </div>
      <div id="loadingBurner">
        <img src={Fire} alt="fire" />
      </div>
      <div id="loadingText">
        <h3 id="loadingH3">
          <span>C</span>
          <span>o</span>
          <span>o</span>
          <span>k</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span> </span>
          <span>S</span>
          <span>o</span>
          <span>m</span>
          <span>e</span>
          <span>t</span>
          <span>h</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span> </span>
          <span>u</span>
          <span>p</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h3>
      </div>
    </div>
  );
};

export default LoadingAnimation;
