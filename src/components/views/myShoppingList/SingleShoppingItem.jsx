import { Button } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";

const SingleShoppingItem = ({ ingredient, remove }) => {
  return (
    <li>
      <input type="checkbox" />
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
