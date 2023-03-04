import { Form, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { editRecipe } from "../../../redux/actions";
import { fetchSingleRecipe } from "../../../redux/actions";
import { changeRecipePhoto } from "../../../redux/actions";
import { deleteThisRecipe } from "../../../redux/actions";

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
  const [image, setImage] = useState(null);

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
    dispatch(editRecipe(editedModal, recipe._id));
    setEdit(null);
  };

  const onDelete = (e) => {
    let answer = window.confirm(
      "Are you sure that you want to delete this recipe?"
    );
    if (answer === false) {
      setEdit(null);
    }
    if (answer === true) {
      setEdit(null);
      dispatch(deleteThisRecipe(recipe._id));
    }
  };

  const onImageUpload = () => {
    const formData = new FormData();
    formData.append("photo", image);
    setImage(null);
    dispatch(changeRecipePhoto(formData, recipe._id));
  };

  return (
    <div id="editRecipeModal">
      <div>
        <div id="editCloseBox">
          <h1>Edit {recipe.title}</h1>
          <div onClick={() => setEdit(null)}>X</div>
        </div>
      </div>
      <div id="editReciPhotoBox">
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Add A Photo of your Recipe</Accordion.Header>
            <Accordion.Body>
              <div className="photoInputs">
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="myFile"
                  name="filename"
                ></input>
                <br />
                <Button onClick={() => onImageUpload()}>Upload Photo</Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div id="editFormBox">
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
      <Button variant="danger" onClick={() => onDelete()}>
        Delete This Recipe
      </Button>
    </div>
  );
};
export default EditRecipeModal;
