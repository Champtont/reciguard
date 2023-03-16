import { Button } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";

const SingleShoppingItem = ({ ingredient }) => {
  return (
    <li>
      <input type="checkbox" />
      {ingredient}{" "}
      <Button>
        <BsTrashFill />
      </Button>
    </li>
  );
};
export default SingleShoppingItem;
