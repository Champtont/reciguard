import { Button } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { useState } from "react";

const SingleShoppingItem = ({ ingredient, remove }) => {
  const [checked, setChecked] = useState(false);
  return (
    <li className={checked === true ? "checkedBox" : ""}>
      <div
        className={checked === false ? "shoppingListCheckCover" : "afterCheck"}
      >
        {checked === true && <GiCheckMark />}
        <input
          style={{
            opacity: 0,
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
          type="checkbox"
          onClick={() => {
            checked === false ? setChecked(true) : setChecked(false);
          }}
        />
      </div>
      {ingredient}{" "}
      <Button
        onClick={(e) => {
          remove(ingredient);
        }}
      >
        <BsTrashFill />
      </Button>
    </li>
  );
};
export default SingleShoppingItem;
