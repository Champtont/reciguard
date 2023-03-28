import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { fetchSingleRecipe } from "../../../redux/actions";
import { current } from "immer";
import { async } from "q";

const SingleRecipePage = () => {
  const oneRecipe = useSelector((state) => state.user.singleRecipe);
  const [hover, setHover] = useState(true);

  const dispatch = useDispatch();
  const params = useParams();
  const recipeId = params.recipeId;
  const stateRef = useRef();

  //attempting to add height dynamically
  const getBoxHeight = async () => {
    const requirementsBox = await document.getElementById(
      "singleRecipeRequirements"
    );
    if (requirementsBox) {
      const requirementsBoxHeight = requirementsBox.clientHeight;
      if (requirementsBoxHeight !== null) {
        setBoxHeight(requirementsBoxHeight);
      }
    }
  };
  const [boxHeight, setBoxHeight] = useState(getBoxHeight());
  stateRef.current = boxHeight;

  const addHeightToPage = async () => {
    const recipeImgBox = document.getElementById("singleRecipeImageBox");
    // const recipeBox = document.getElementById("singleRecipeContainer");
    /*const requirementsBoxHeight = document.getElementById(
      "singleRecipeRequirements"
    ).clientHeight;*/
    let width = window.innerWidth;
    if (recipeImgBox) {
      console.log(boxHeight);
      if (width > 850) {
        recipeImgBox.style.marginBottom = `${boxHeight}px`;
      }
    }
  };
  //end of experiment

  useEffect(() => {
    dispatch(fetchSingleRecipe(recipeId));
    console.log(oneRecipe === null);
    addHeightToPage();
  }, []);

  return (
    <div id="singleRecipeContainer">
      {oneRecipe !== null && (
        <div>
          <h1>{oneRecipe.title}</h1>
          <div id="singleRecipeImageBox">
            <img
              src={oneRecipe.photo}
              alt={oneRecipe.title}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div id="singleRecipeRequirements">
            <h2>Ingredients</h2>
            <ul>
              {oneRecipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <h2>Instructions</h2>
            <ol>
              {oneRecipe.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
export default SingleRecipePage;
