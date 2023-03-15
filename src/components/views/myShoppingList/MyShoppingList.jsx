import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../../redux/actions";
import { useEffect } from "react";

const MyShoppingList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  });

  return (
    <div id="shoppingPage">
      <h2>There is nothing here Yet</h2>
    </div>
  );
};
export default MyShoppingList;
