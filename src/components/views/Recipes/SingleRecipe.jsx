import { AiOutlineFire, AiFillFire } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";
import EditRecipeModal from "./EditRecipeModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleRecipe,
  addToFavs,
  removeFromFavs,
} from "../../../redux/actions";
import { useRef, useState } from "react";

const SingleRecipe = ({ recipe, setEdit, edit }) => {
  const userFavorites = useSelector((state) => state.user.favorites);
  const [favorites, setFavorites] = useState([]);
  const [show, setShow] = useState(true);
  const [reference, setReference] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const stateRef = useRef();

  stateRef.current = favorites;

  const prepareEditBox = () => {
    dispatch(fetchSingleRecipe(recipe._id));
  };

  const isInArray = () => {
    for (let i = 0; i < userFavorites.length; i++) {
      setFavorites((favorites) => [...favorites, userFavorites[i]]);
      if (userFavorites[i]._id === recipe._id) {
        setReference(`${recipe._id}`);
      }
    }
  };

  useState(() => isInArray(), []);

  const thisRecipe = recipe;

  return (
    <div>
      {recipe !== null && (
        <div className="recipeCard">
          {edit === `${recipe._id}` && (
            <EditRecipeModal
              key={recipe._id}
              recipe={recipe}
              setEdit={setEdit}
            />
          )}
          <div className="recipeCardNameBox">
            <div>
              <div className="recipeAvatarBox">
                <img
                  src={recipe.author.avatar}
                  alt="user avatar"
                  className="img-fluid"
                />
              </div>
              <div className="recipeCardAuthor">
                <h4>{recipe.author.firstName}</h4>
              </div>
            </div>
            {location.pathname === "/myProfile" && (
              <div
                className="recipeEditButton"
                onClick={() => {
                  setEdit(`${recipe._id}`);
                }}
              >
                <FiEdit2 size={26} />
              </div>
            )}
          </div>
          <div className="recipeCardPhotoBox">
            <div className="recipeTitle">
              <div className="singleTitle">{recipe.title}</div>
              {reference !== recipe._id ? (
                <>
                  <div
                    className={show === true ? "favoriteBox ms-2" : "hidden"}
                    onClick={() => {
                      dispatch(addToFavs(thisRecipe));
                      setShow(false);
                    }}
                  >
                    <AiOutlineFire size={26} />
                  </div>
                  <div
                    className={show === false ? "favoriteBox ms-2" : "hidden"}
                    onClick={() => {
                      dispatch(removeFromFavs(recipe._id));
                      setShow(true);
                    }}
                  >
                    <AiFillFire size={26} />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={show === true ? "favoriteBox ms-2" : "hidden"}
                    onClick={() => {
                      dispatch(removeFromFavs(recipe._id));
                      setShow(false);
                    }}
                  >
                    <AiFillFire size={26} />
                  </div>
                  <div
                    className={show === false ? "favoriteBox ms-2" : "hidden"}
                    onClick={() => {
                      dispatch(addToFavs(thisRecipe));
                      setShow(true);
                    }}
                  >
                    <AiOutlineFire size={26} />
                  </div>
                </>
              )}
            </div>
            <div className="singleDescription">{recipe.description}</div>
            <Link to={`/recipe/${recipe._id}`}>
              <img src={recipe.photo} alt="food" className="img-fluid" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRecipe;
