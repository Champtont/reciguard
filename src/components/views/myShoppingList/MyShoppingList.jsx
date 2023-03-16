import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../../redux/actions";
import { useEffect, useRef } from "react";
import { useState } from "react";
import SingleShoppingItem from "./SingleShoppingItem";

const MyShoppingList = () => {
  const userShopMenus = useSelector((state) => state.user.calendar);
  const [shoppingIngredients, setShoppingIngredients] = useState([]);

  const generateIngredients = () => {
    for (let i = 0; i < userShopMenus.length; i++) {
      for (let j = 0; j < userShopMenus[i].recipes.length; j++) {
        for (
          let n = 0;
          n < userShopMenus[i].recipes[j].ingredients.length;
          n++
        ) {
          if (
            shoppingIngredients.includes(
              userShopMenus[i].recipes[j].ingredients[n]
            )
          ) {
            continue;
          } else {
            setShoppingIngredients((shoppingIngredients) => [
              ...shoppingIngredients,
              userShopMenus[i].recipes[j].ingredients[n],
            ]);
          }
        }
      }
    }
    return shoppingIngredients;
  };
  const stateRef = useRef();
  const dispatch = useDispatch();

  stateRef.current = shoppingIngredients;

  const newShopArray = stateRef.current.filter(function (elem, pos) {
    return stateRef.current.indexOf(elem) == pos;
  });

  useEffect(() => {
    dispatch(fetchCurrentUser());
    generateIngredients();
  }, [shoppingIngredients]);

  return (
    <div id="shoppingPage">
      <h2>My Shopping List</h2>
      {stateRef.current.length > 0 ? (
        <ul id="shoppingList">
          {newShopArray.map((ingredient) => (
            <SingleShoppingItem ingredient={ingredient} key={ingredient} />
          ))}
        </ul>
      ) : (
        <div>Select a date range on your calendar to get started!</div>
      )}
    </div>
  );
};
export default MyShoppingList;
