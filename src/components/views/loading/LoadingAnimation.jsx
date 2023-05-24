import Pan from "../../assets/Pan.png";
import Fire from "../../assets/flame.gif";
import Onion from "../../assets/Onion.png";
import Padron from "../../assets/padronColor.png";
import Carrot from "../../assets/carrotColor.png";
import Tomato from "../../assets/tomatoColor.png";
import Mushroom from "../../assets/mushroom.png";
import Potato from "../../assets/potatoColor.png";
import Oil from "../../assets/oilBottle.png";

const LoadingAnimation = () => {
  return (
    <>
      <div id="loadingOil">
        <img src={Oil} alt="cooking oil" loading="lazy" />
      </div>
      <div id="loadingPage">
        <div id="loadingPan">
          <img src={Pan} alt="cooking skillet" loading="eager" />
          <div id="loadingBasket">
            <div className="loadingIngredients">
              <img src={Onion} alt="cooking onion" loading="lazy" />
            </div>
            <div className="loadingIngredients">
              <img src={Padron} alt="cooking padron" loading="lazy" />
            </div>
            <div className="loadingIngredients">
              <img src={Carrot} alt="cooking carrot" loading="lazy" />
            </div>
            <div className="loadingIngredients">
              <img src={Mushroom} alt="cooking mushroom" loading="lazy" />
            </div>
            <div className="loadingIngredients">
              <img src={Tomato} alt="cooking tomato" loading="lazy" />
            </div>
            <div className="loadingIngredients">
              <img src={Potato} alt="cooking potato" loading="lazy" />
            </div>
          </div>
          <div id="panCover"></div>
          <div id="panCoverLow"></div>
        </div>
        <div id="loadingBurner">
          <img src={Fire} alt="fire" loading="lazy" />
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
            <span className="mx-1"> </span>
            <span>S</span>
            <span>o</span>
            <span>m</span>
            <span>e</span>
            <span>t</span>
            <span>h</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span className="mx-1"> </span>
            <span>u</span>
            <span>p</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default LoadingAnimation;
