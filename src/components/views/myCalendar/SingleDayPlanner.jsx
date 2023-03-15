import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import DragableListItem from "./DragableListItem";
import SaveSpaceItem from "./SaveSpaceItem";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import { postNewMenu, deleteThisMenu } from "../../../redux/actions/index.js";

const SingleDayPlanner = (props) => {
  const userRecipes = useSelector((state) => state.user.userRecipes);
  const [saveSpace, setSaveSpace] = useState([]);
  const [editSpace, setEditSpace] = useState([]);
  const [thisMenu, setThisMenu] = useState(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      if (editSpace.length > 0) {
        addDivToEditSpace();
      } else {
        addDivToSaveSpace(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dispatch = useDispatch();

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
          setEditSpace((editSpace) => [...editSpace, menuItem]);
          setThisMenu(props.menus[i]);
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
  const addDivToEditSpace = (id) => {
    const menuItemOfDay = userRecipes.filter((recipe) => id === recipe._id);
    const currentEditSpace = editSpace;
    if (currentEditSpace.includes(menuItemOfDay)) {
      alert("already there");
    } else {
      setEditSpace((editSpace) => [...editSpace, menuItemOfDay[0]]);
    }
  };

  const removeDivFromSaveSpace = (id) => {
    setSaveSpace((current) => {
      return current.filter((recipe) => recipe._id !== id);
    });
  };
  const removeDivFromEditSpace = (id) => {
    setEditSpace((current) => {
      return current.filter((recipe) => recipe._id !== id);
    });
  };

  const editEvent = {
    recipes: [editSpace],
    planDate: props.date.toISOString(),
  };

  const event = {
    recipes: saveSpace,
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
              {editSpace.map((recipe) => {
                return (
                  <SaveSpaceItem
                    id={recipe._id}
                    title={recipe.title}
                    saveSpace={editSpace}
                    key={recipe._id}
                    remove={removeDivFromEditSpace}
                  />
                );
              })}
            </div>
            {editSpace.length > 0 ? (
              <>
                <Button className="mt-1">Edit This menu</Button>
                <Button
                  className="mt-1 ms-1"
                  onClick={() => {
                    dispatch(deleteThisMenu(thisMenu._id));
                    props.setSelected(false);
                  }}
                >
                  Delete Menu
                </Button>
              </>
            ) : (
              saveSpace.length > 0 && (
                <Button
                  className="mt-1"
                  onClick={(e) => {
                    dispatch(
                      postNewMenu(
                        event,
                        format(parseISO(props.date.toISOString()), "yyyy-MM-dd")
                      )
                    );
                    props.setSelected(false);
                  }}
                >
                  Save This menu
                </Button>
              )
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
