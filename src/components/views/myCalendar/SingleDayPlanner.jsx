import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import DragableListItem from "./DragableListItem";
import SaveSpaceItem from "./SaveSpaceItem";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";

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

  useEffect(() => {
    checkSaveSpace();
    console.log("fired");
  }, []);

  const checkSaveSpace = () => {
    for (let i = 0; i < props.menus.length; i++) {
      if (
        format(parseISO(props.date.toISOString()), "MM dd") ===
        format(new Date(props.menus[i].planDate), "MM dd")
      ) {
        for (let j = 0; j < props.menus[i].recipes.length; j++) {
          let menuItem = props.menus[i].recipes[j];
          setSaveSpace((saveSpace) => [...saveSpace, menuItem]);
        }
      }
    }
  };

  const addDivToSaveSpace = (id) => {
    const menuItemOfDay = userRecipes.filter((recipe) => id === recipe._id);
    const currentSaveSpace = saveSpace;
    if (currentSaveSpace.includes(menuItemOfDay)) {
      alert("already there");
    } else {
      setSaveSpace((saveSpace) => [...saveSpace, menuItemOfDay[0]]);
    }
  };
  const removeDivFromSaveSpace = (id) => {
    setSaveSpace((current) => {
      return current.filter((recipe) => recipe._id !== id);
    });
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
              <h1>Select Recipe(s) for {props.date.toDateString()}</h1>
            </div>
            <div id="singleDayDowner" ref={drop}>
              {saveSpace.map((recipe) => {
                return (
                  <SaveSpaceItem
                    id={recipe._id}
                    title={recipe.title}
                    saveSpace={saveSpace}
                    key={recipe._id}
                    remove={removeDivFromSaveSpace}
                  />
                );
              })}
            </div>
            {saveSpace.length > 0 && (
              <Button className="mt-1">Save This menu</Button>
            )}
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
