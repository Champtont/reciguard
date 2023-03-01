import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../../redux/actions";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <div>
      <h1>You made it, but there's nothing yet!</h1>
    </div>
  );
};
export default HomePage;
