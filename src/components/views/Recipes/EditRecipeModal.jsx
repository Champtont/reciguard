import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { editRecipe } from "../../../redux/actions";
import { fetchSingleRecipe } from "../../../redux/actions";

const EditRecipeModal = ({ recipe, setEdit }) => {
  const oneRecipe = useSelector((state) => state.user.singleRecipe);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleRecipe(recipe._id));
  }, []);

  const [tags, setTags] = useState(recipe.categoryTags);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  const editedModal = {
    categoryTags: tags !== recipe.categoryTags ? tags.split(",") : tags,
    title: title,
    description: description,
    ingredients:
      ingredients !== recipe.ingredients ? ingredients.split(",") : ingredients,
    instructions:
      instructions !== recipe.instructions
        ? instructions.split(",")
        : instructions,
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(editRecipe(editedModal, `${recipe._id}`));
  };

  return (
    <div id="editRecipeModal">
      <div>
        <div id="editCloseBox">
          <h1>Edit {recipe.title}</h1>
          <div onClick={() => setEdit(null)}>X</div>
        </div>
      </div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="fw-bold">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder={recipe.title}
            />
          </div>
          <div>
            <label className="fw-bold">Category</label>
            <input
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              type="text"
              placeholder={recipe.categoryTags}
            />
          </div>
          <div>
            <label className="fw-bold">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder={recipe.description}
            />
          </div>
          <div>
            <label className="fw-bold">Ingredients</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              type="text"
              placeholder={recipe.ingredients}
            />
          </div>
          <div>
            <label className="fw-bold">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              type="text"
              style={{ height: "100px" }}
              placeholder={recipe.instructions}
            />
          </div>
          <Button
            className="login-80p mb-4 fw-bold"
            variant="success"
            type="submit"
          >
            Edit
          </Button>
        </form>
      </div>
      <Button variant="danger">Delete This Recipe</Button>
    </div>
  );
};
export default EditRecipeModal;
