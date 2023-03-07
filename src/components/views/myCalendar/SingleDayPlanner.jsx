import { useSelector } from "react-redux";
import { useState } from "react";
import { useDrop } from "react-dnd";
import DragableListItem from "./DragableListItem";

const SingleDayPlanner = (props) => {
  const userRecipes = useSelector((state) => state.user.userRecipes);
  const [saveSpace, setSaveSpace] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addDivToSaveSpace(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addDivToSaveSpace = (id) => {
    const menuOfDayList = userRecipes.filter((recipe) => id === recipe._id);
    setSaveSpace((saveSpace) => [...saveSpace, menuOfDayList[0]]);
  };

  const event = {
    recipes: [saveSpace],
    planDate: props.date,
  };
  return (
    <>
      <div id="singleModalFilter">
        <div id="singleModalExit" onClick={() => props.setSelected(false)}>
          X
        </div>
        <div id="singleDayModal">
          <div id="singleDayLeft">
            <div id="singleDayUpper">
              <h1>Select Recipe(s) for {props.date}</h1>
            </div>
            <div id="singleDayDowner" ref={drop}>
              {saveSpace.map((recipe) => {
                return (
                  <DragableListItem
                    id={recipe._id}
                    title={recipe.title}
                    key={recipe._id}
                  />
                );
              })}
            </div>
          </div>
          <div id="singleDayOptBox">
            {props.recipes.map((recipe) => (
              <DragableListItem
                id={recipe._id}
                title={recipe.title}
                key={recipe._id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleDayPlanner;
