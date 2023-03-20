import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../../redux/actions";
import { useEffect, useRef } from "react";
import { useState } from "react";
import SingleShoppingItem from "./SingleShoppingItem";
import { Button } from "react-bootstrap";
import { postNewList } from "../../../redux/actions";

const MyShoppingList = () => {
  const userShopMenus = useSelector((state) => state.user.calendar);
  const userRecentList = useSelector((state) => state.user.shoppingList.items);
  const [shoppingIngredients, setShoppingIngredients] = useState([]);
  const [newItem, setNewItem] = useState("");

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

  const pushIntoArray = () => {
    console.log("I'm here");
    setShoppingIngredients((shoppingIngredients) => [
      ...shoppingIngredients,
      newItem,
    ]);
    console.log("i ran");
    setNewItem("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      pushIntoArray();
    }
  };
  const removeItemFromArray = (ingredient) => {
    setShoppingIngredients((current) => {
      console.log(current);
      return current.filter((recipe) => recipe !== ingredient);
    });
  };

  const getLastSaved = () => {
    setShoppingIngredients([]);
    for (let i = 0; i < userRecentList.length; i++) {
      setShoppingIngredients((shoppingIngredients) => [
        ...shoppingIngredients,
        userRecentList[i],
      ]);
    }
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
    generateIngredients();
  }, []);

  const addToList = {
    items: newShopArray,
  };

  return (
    <div id="shoppingPage">
      <h2>My Shopping List</h2>
      {userRecentList.length > 0 && (
        <Button onClick={() => getLastSaved()}>Get saved List</Button>
      )}
      {stateRef.current.length > 0 ? (
        <>
          <ul id="shoppingList">
            {newShopArray.map((ingredient) => (
              <SingleShoppingItem
                ingredient={ingredient}
                key={ingredient}
                remove={removeItemFromArray}
              />
            ))}
          </ul>
          <input
            type="text"
            value={newItem}
            placeholder="add more to your list"
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={(e) => {
              console.log("clicked");
              dispatch(postNewList(addToList));
            }}
          >
            Save This List
          </Button>
        </>
      ) : (
        <div>Select a date range on your calendar to get started!</div>
      )}
    </div>
  );
};
export default MyShoppingList;
