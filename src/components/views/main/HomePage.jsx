import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, fetchAllRecipes } from "../../../redux/actions";
import SingleRecipe from "../Recipes/SingleRecipe";

const HomePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const allRecipes = useSelector((state) => state.user.allRecipes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchAllRecipes());
  }, []);

  return (
    <div id="homeMainBox">
      {currentUser !== null && (
        <h1>Welcome {currentUser.firstName}, browse some recipes!</h1>
      )}
      <div id="allRecipeList">
        {allRecipes.map((recipe) => (
          <SingleRecipe key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
