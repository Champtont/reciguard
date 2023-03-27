import { useDrag } from "react-dnd";

const DragableListItem = ({ id, title }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      className="draggableBoxes text-truncate"
      ref={drag}
      style={{ opacity: isDragging ? "0" : "1" }}
    >
      <p>{title}</p>
    </div>
  );
};

export default DragableListItem;
