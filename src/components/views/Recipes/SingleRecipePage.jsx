import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleRecipe } from "../../../redux/actions";

const SingleRecipePage = () => {
  const oneRecipe = useSelector((state) => state.user.singleRecipe);

  const dispatch = useDispatch();
  const params = useParams();
  const recipeId = params.recipeId;

  //const ingredients = oneRecipe.ingredients;
  //const instructions = oneRecipe.instructions;

  useEffect(() => {
    dispatch(fetchSingleRecipe(recipeId));
    console.log(oneRecipe === null);
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
