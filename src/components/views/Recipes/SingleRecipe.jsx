import { AiOutlineFire, AiFillFire } from "react-icons/ai";

const SingleRecipe = ({ recipe }) => {
  console.log(recipe.title);
  return (
    <div>
      {recipe !== null && (
        <div className="recipeCard">
          <div className="recipeCardNameBox">
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
          <div className="recipeCardPhotoBox">
            <div className="recipeTitle">
              <div className="singleTitle">{recipe.title}</div>
              <div className="favoriteBox ms-2">
                <AiOutlineFire size={26} />
              </div>
            </div>
            <img src={recipe.photo} alt="food" className="img-fluid" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRecipe;
