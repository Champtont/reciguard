import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, fetchAllRecipes } from "../../../redux/actions";
import SingleRecipe from "../Recipes/SingleRecipe";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const allRecipes = useSelector((state) => state.user.allRecipes);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchAllRecipes());
    if (params !== "/home") {
      console.log("trying something");
    }
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
