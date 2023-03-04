import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { addANewRecipe } from "../../../redux/actions";

const AddNewRecipeModal = ({ setEdit }) => {
  const dispatch = useDispatch();

  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const recipeInfo = {
    categoryTags: tags.split(","),
    title: title,
    description: description,
    ingredients: ingredients.split(","),
    instructions: instructions.split(","),
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addANewRecipe(recipeInfo));
  };

  return (
    <div id="addNewModal">
      <div id="newRecipeCloseBox">
        <h1>Add Something New!</h1>
        <div onClick={() => setEdit(null)}>X</div>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label className="fw-bold">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="title"
          />
        </div>
        <div>
          <label className="fw-bold">Category</label>
          <input
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            type="text"
            placeholder="ex: oven,quick,dinner"
          />
        </div>
        <div>
          <label className="fw-bold">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="description"
          />
        </div>
        <div>
          <label className="fw-bold">Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            type="text"
            placeholder="ingredients"
          />
        </div>
        <div>
          <label className="fw-bold">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            type="text"
            style={{ height: "100px" }}
            placeholder="instructions"
          />
        </div>
        <Button
          className="login-80p mb-4 fw-bold"
          variant="success"
          type="submit"
        >
          Add New Recipe
        </Button>
      </form>
    </div>
  );
};
export default AddNewRecipeModal;
