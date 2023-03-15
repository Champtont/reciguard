import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  fetchAllRecipes,
  fetchCurrentGoogleUser,
  fetchingMyRecipes,
} from "../../../redux/actions";
import SingleRecipe from "../Recipes/SingleRecipe";
import { useParams } from "react-router-dom";
import { feURL } from "../../../redux/actions";
import LoadingAnimation from "../loading/LoadingAnimation.jsx";

const HomePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const allRecipes = useSelector((state) => state.user.allRecipes);

  const [loading, isLoading] = useState(true);

  const dispatch = useDispatch();
  const params = useParams();

  const accessToken = params.key;

  useEffect(() => {
    if (window.location.href !== `${feURL}/home`) {
      dispatch(fetchCurrentGoogleUser(`${accessToken}`));
      dispatch(fetchAllRecipes(isLoading));
      dispatch(fetchingMyRecipes());
    } else {
      dispatch(fetchCurrentUser());
      dispatch(fetchAllRecipes(isLoading));
      dispatch(fetchingMyRecipes());
    }
  }, []);

  return (
    <div id="homeMainBox">
      {currentUser !== null && (
        <h1>Welcome {currentUser.firstName}, browse some recipes!</h1>
      )}
      {loading === true ? (
        <LoadingAnimation />
      ) : (
        <div id="allRecipeList">
          {allRecipes.map((recipe) => (
            <SingleRecipe key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};
export default HomePage;
