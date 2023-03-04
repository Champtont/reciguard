import { AiOutlineFire, AiFillFire } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import EditRecipeModal from "./EditRecipeModal";

const SingleRecipe = ({ recipe, setEdit, edit }) => {
  const location = useLocation();

  return (
    <div>
      {recipe !== null && (
        <div className="recipeCard">
          {edit === "editThisReci" && <EditRecipeModal recipe={recipe} />}
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
                onClick={() => setEdit("editThisReci")}
              >
                <FiEdit2 size={26} />
              </div>
            )}
          </div>
          <div className="recipeCardPhotoBox">
            <div className="recipeTitle">
              <div className="singleTitle">{recipe.title}</div>
              <div className="favoriteBox ms-2">
                <AiOutlineFire size={26} />
              </div>
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
