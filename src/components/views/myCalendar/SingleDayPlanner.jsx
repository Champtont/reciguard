import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import DragableListItem from "./DragableListItem";
import SaveSpaceItem from "./SaveSpaceItem";
import { Button, Form } from "react-bootstrap";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import {
  postNewMenu,
  deleteThisMenu,
  editMenu,
} from "../../../redux/actions/index.js";

const SingleDayPlanner = (props) => {
  const userRecipes = useSelector((state) => state.user.userRecipes);
  const userFavs = useSelector((state) => state.user.favorites);
  const [saveSpace, setSaveSpace] = useState([]);
  const [favSpace, setFavSpace] = useState([]);
  const [editSpace, setEditSpace] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [check, setCheck] = useState(false);
  const [thisMenu, setThisMenu] = useState(null);
  const [favRecipes, setFavRecipes] = useState(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      if (stateRef.current === true && favRecipes === null) {
        addDivToEditSpace(item.id);
      } else {
        addDivToSaveSpace(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const stateRef = useRef();
  const dispatch = useDispatch();

  stateRef.current = check;
  stateRef.now = favRecipes;

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
          setCheck(true);
          console.log(check);
        }
      }
    }
  };

  const addDivToSaveSpace = (id) => {
    const menuItemOfDay = userRecipes.filter((recipe) => id === recipe._id);
    const favItem = userFavs.filter((recipe) => id === recipe._id);
    const currentSaveSpace = saveSpace;
    if (stateRef.now === null) {
      setSaveSpace((saveSpace) => [...saveSpace, menuItemOfDay[0]]);
      console.log(menuItemOfDay);
    } else if (stateRef.now !== null) {
      setSaveSpace((saveSpace) => [...saveSpace, favItem[0]]);
      console.log(favItem);
    }
  };
  const addFavDivToFavSpace = (id) => {
    const menuItem = userFavs.filter((recipe) => id === recipe._id);
    const currentSaveSpace = favSpace;
    if (currentSaveSpace.includes(menuItem)) {
      alert("already there");
    } else {
      console.log("added to fav space");
      setFavSpace((favSpace) => [...favSpace, menuItem[0]]);
    }
  };
  const addDivToEditSpace = (id) => {
    const menuItemOfDay = userRecipes.filter((recipe) => id === recipe._id);
    const currentEditSpace = editSpace;
    if (currentEditSpace.includes(menuItemOfDay)) {
      alert("already there");
    } else {
      console.log("added to edit space");
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
    recipes: editSpace,
  };

  const event = {
    recipes: saveSpace,
  };
  return (
    <>
      <div id="singleModalFilter">
        {searchQuery === "" && (
          <Button
            id="singleDaySwitch"
            onClick={() => {
              favRecipes === null ? setFavRecipes("favs") : setFavRecipes(null);
            }}
          >
            {favRecipes === null ? "Search Favs" : "Search Recipes"}
          </Button>
        )}
        <div
          id="singleModalExit"
          onClick={() => {
            setSaveSpace([]);
            setEditSpace([]);
            setFavSpace([]);
            setCheck(false);
            props.setSelected(false);
          }}
        >
          X
        </div>
        <div id="singleDayBtnBox">
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
            </div>
            <div id="singleDayOptBox">
              <Form.Group id="singleDaySearchBox">
                <Form.Control
                  type="text"
                  placeholder={
                    favRecipes === null ? "Search Recipes" : "Search Favs"
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
              {favRecipes === null &&
                props.recipes
                  .filter((r) => r.title.toLowerCase().includes(searchQuery))
                  .map((recipe) => (
                    <DragableListItem
                      id={recipe._id}
                      title={recipe.title}
                      key={recipe._id}
                    />
                  ))}
              {favRecipes === "favs" &&
                props.favs &&
                props.favs
                  .filter((r) => r.title.toLowerCase().includes(searchQuery))
                  .map((recipe) => (
                    <DragableListItem
                      id={recipe._id}
                      title={recipe.title}
                      key={recipe._id}
                    />
                  ))}
            </div>
          </div>
          <div id="singleDayEditDelete">
            {editSpace.length > 0 ? (
              <>
                <Button
                  className="mt-1"
                  onClick={() => {
                    dispatch(editMenu(editEvent, thisMenu._id));
                    setCheck(false);
                    props.setSelected(false);
                  }}
                >
                  Edit This menu
                </Button>
                <Button
                  className="mt-1"
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
                    setSaveSpace([]);
                  }}
                >
                  Save This menu
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleDayPlanner;
