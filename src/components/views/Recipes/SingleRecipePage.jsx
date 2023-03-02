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
    <Container>
      {oneRecipe !== null && (
        <div>
          <div id="singleRecipeImageBox">
            <img
              src={oneRecipe.photo}
              alt={oneRecipe.title}
              className="img-fluid"
            />
          </div>
          <div>
            <h1>{oneRecipe.title}</h1>
            <h4>Ingredients</h4>
            <ul>
              {oneRecipe.ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
            </ul>
            <h4>Instructions</h4>
            <ol>
              {oneRecipe.instructions.map((instruction) => (
                <li>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </Container>
  );
};
export default SingleRecipePage;
