import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser, fetchAllRecipes } from "../../../redux/actions";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchAllRecipes());
  }, []);

  return (
    <div>
      <h1>You made it, but there's nothing yet!</h1>
    </div>
  );
};
export default HomePage;
