import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { addANewRecipe } from "../../../redux/actions";

const AddNewRecipeModal = ({ setEdit }) => {
  const dispatch = useDispatch();

  const [catTags, setCatTags] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [newInstructions, setNewInstructions] = useState("");

  const newRecipeInfo = {
    categoryTags: catTags.split(","),
    title: newTitle,
    description: newDescription,
    ingredients: newIngredients.split(","),
    instructions: newInstructions.split(","),
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addANewRecipe(newRecipeInfo));
    setEdit(null);
  };

  return (
    <div id="addNewModal">
      <div id="newRecipeCloseBox">
        <h1>Add Something New!</h1>
        <div onClick={() => setEdit(null)}>X</div>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="aFormBox">
          <label className="fw-bold">Title</label>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            type="text"
            placeholder="title"
          />
        </div>
        <div className="aFormBox">
          <label className="fw-bold">Category</label>
          <input
            onChange={(e) => setCatTags(e.target.value)}
            value={catTags}
            type="text"
            placeholder="ex: oven,quick,dinner"
          />
        </div>
        <div className="aFormBox">
          <label className="fw-bold">Description</label>
          <textarea
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            type="text"
            placeholder="description"
          />
        </div>
        <div className="aFormBox">
          <label className="fw-bold">Ingredients</label>
          <textarea
            value={newIngredients}
            onChange={(e) => setNewIngredients(e.target.value)}
            type="text"
            placeholder="be sure to separate each ingredient with a comma(,)"
          />
        </div>
        <div className="aFormBox">
          <label className="fw-bold">Instructions</label>
          <textarea
            value={newInstructions}
            onChange={(e) => setNewInstructions(e.target.value)}
            type="text"
            style={{ height: "100px" }}
            placeholder="be sure to separate each instruction with a comma(,)"
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
