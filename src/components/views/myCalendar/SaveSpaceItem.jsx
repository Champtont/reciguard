import { BsTrashFill } from "react-icons/bs";

const SaveSpaceItem = ({ id, title, saveSpace, remove }) => {
  return (
    <div className="draggableBoxes">
      <p className="text-truncate" style={{ width: "100px" }}>
        {title}
      </p>
      <div
        onClick={() => {
          remove(`${id}`);
        }}
      >
        <BsTrashFill />
      </div>
    </div>
  );
};
export default SaveSpaceItem;
