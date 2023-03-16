import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../../redux/actions";
import { useEffect, useRef } from "react";
import { useState } from "react";

const MyShoppingList = () => {
  const userShopMenus = useSelector((state) => state.user.calendar);
  const [shoppingIngredients, setShoppingIngredients] = useState([]);
  //loop for ingredients
  //let shoppingIngredients = [];

  const generateIngredients = () => {
    for (let i = 0; i < userShopMenus.length; i++) {
      console.log("1");
      for (let j = 0; j < userShopMenus[i].recipes.length; j++) {
        console.log("2");
        for (
          let n = 0;
          n < userShopMenus[i].recipes[j].ingredients.length;
          n++
        ) {
          console.log(shoppingIngredients);
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
        <ul>
          {newShopArray.map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <div>nothing yet</div>
      )}
    </div>
  );
};
export default MyShoppingList;
