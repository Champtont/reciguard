import { Form, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  deleteThisRecipe,
  addANewRecipe,
  changeRecipePhoto,
  editRecipe,
} from "../../../redux/actions";

const EditRecipeModal = ({ recipe, setEdit, showFavs }) => {
  const [fileName, setFileName] = useState("No file chosen");
  const dispatch = useDispatch();
  const stateRef = useRef();

  stateRef.current = showFavs;

  const [tags, setTags] = useState(recipe.categoryTags);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [image, setImage] = useState(null);

  const editedModal = {
    categoryTags: tags === recipe.categoryTags ? tags : tags.split(";"),
    title: title,
    description: description,
    ingredients:
      ingredients === recipe.ingredients ? ingredients : ingredients.split(";"),
    instructions:
      instructions === recipe.instructions
        ? instructions
        : instructions.split(";"),
  };

  const onSubmitHandler = (e) => {
    if (!showFavs) {
      e.preventDefault();
      dispatch(editRecipe(editedModal, recipe._id));
      setEdit(null);
    } else {
      e.preventDefault();
      dispatch(addANewRecipe(editedModal));
      setEdit(null);
    }
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

  const onImageUpload = async () => {
    const formData = new FormData();
    formData.append("photo", image);
    setImage(null);
    dispatch(changeRecipePhoto(formData, recipe._id));
    setEdit(null);
  };

  return (
    <>
      <div id="editRecipeModal">
        <div className="addEditExitBtn" onClick={() => setEdit(null)}>
          X
        </div>
        <div>
          <div id="editCloseBox">
            <h1>Edit {recipe.title}</h1>
          </div>
        </div>
        {!showFavs && (
          <div id="editReciPhotoBox">
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add A Photo of your Recipe</Accordion.Header>
                <Accordion.Body>
                  <div className="photoInputs">
                    <input
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setFileName(e.target.files[0].name);
                      }}
                      type="file"
                      id="myEditFile"
                      name="filename"
                    ></input>
                    <div id="fileInputCover">
                      <Button>Choose File</Button>
                      <input type="text" value={fileName} readOnly />
                    </div>
                    <br />
                    <Button onClick={() => onImageUpload()}>
                      Upload Photo
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
        <div id="editFormBox">
          <form onSubmit={onSubmitHandler}>
            <div className="aFormBox">
              <label className="">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder={recipe.title}
              />
            </div>
            <div className="aFormBox">
              <label className="">Category</label>
              <input
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                type="text"
                placeholder={recipe.categoryTags}
              />
            </div>
            <div className="aFormBox">
              <label className="">Description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                type="text"
                placeholder={recipe.description}
              />
            </div>
            <div className="aFormBox">
              <label className="">Ingredients</label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                type="text"
                placeholder={recipe.ingredients}
              />
            </div>
            <div className="aFormBox">
              <label className="">Instructions</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                type="text"
                style={{ height: "100px" }}
                placeholder={recipe.instructions}
              />
            </div>
            {showFavs ? (
              <Button type="submit">Save My changes</Button>
            ) : (
              <Button
                className="login-80p my-2 fw-bold"
                variant="success"
                type="submit"
              >
                Edit
              </Button>
            )}
          </form>
        </div>
        <Button variant="danger" onClick={() => onDelete()}>
          Delete This Recipe
        </Button>
      </div>
    </>
  );
};
export default EditRecipeModal;
