import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { MdExitToApp } from "react-icons/md";
import { changeUserAvatar } from "../../../redux/actions";
import SingleRecipe from "../Recipes/SingleRecipe";
import NameInput from "./NameInput";
import AddNewRecipeModal from "../Recipes/AddNewRecipeModal";

const MyProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userRecipes = useSelector((state) => state.user.userRecipes);
  const [isSelected, setSelected] = useState(false);
  const [isModal, setModal] = useState("");
  const [edit, setEdit] = useState(null);
  const [username, setUsername] = useState(currentUser.firstName);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");

  const dispatch = useDispatch();

  const editedUser = {
    firstName: username,
  };

  const onImageUpload = () => {
    const formData = new FormData();
    formData.append("avatar", image);
    setImage(null);
    dispatch(changeUserAvatar(formData));
  };

  return (
    <Container className="profilePage">
      <div>
        <div id="userPicBox">
          <div
            id="userPicButtonFilter"
            onClick={() => {
              setSelected(true);
            }}
          >
            <FiEdit2 size={60} />
          </div>
          <img alt={`${currentUser.firstName}`} src={`${currentUser.avatar}`} />
        </div>
        {isSelected === true && (
          <div id="changePicModal">
            <div id="picModalTop">
              <div>
                <h2>Change your Photo:</h2>
              </div>
              <div
                id="modalExitButton"
                onClick={() => {
                  setSelected(false);
                  setFileName("No file chosen");
                }}
              >
                <MdExitToApp size={26} />
              </div>
            </div>
            <div className="picModalBottom">
              <input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                }}
                type="file"
                id="myFile"
                name="filename"
              ></input>
              <div className="photoInputs">
                <div id="fileInputCover">
                  <Button>Choose File</Button>
                  <input type="text" value={fileName} />
                </div>
                <Button onClick={() => onImageUpload()}>Upload Avatar</Button>
              </div>
            </div>
          </div>
        )}
        <div id="nameBox">
          <div id="nameAndEdit">
            <h3>{currentUser.firstName}</h3>
            {edit === "changeName" && (
              <NameInput
                value={username}
                setName={setUsername}
                editedUser={editedUser}
                setEdit={setEdit}
              />
            )}
            {edit !== "changeName" && (
              <div
                onClick={() => setEdit("changeName")}
                className="recipeEditButton"
              >
                <FiEdit2 size={20} />
              </div>
            )}
          </div>
        </div>
        <div id="recipeCount">
          I have Saved{" "}
          <span style={{ fontWeight: "bold", color: "green" }}>
            {currentUser.recipeBook.length}
          </span>{" "}
          Recipe(s) in my book.
        </div>
      </div>
      <Row>
        <div id="recipeInfoBox">
          <Row>
            <Button id="addNewReciBtn" onClick={() => setEdit("addNewReci")}>
              Add A New Recipe
            </Button>
            {edit === "addNewReci" && <AddNewRecipeModal setEdit={setEdit} />}
            <h3>My Recipes</h3>
          </Row>
          <Row>
            <div id="recipeSearch"></div>
            {userRecipes !== null && (
              <div id="recipeResults">
                {userRecipes.map((recipe) => (
                  <SingleRecipe
                    key={recipe._id}
                    recipe={recipe}
                    setEdit={setEdit}
                    edit={edit}
                  />
                ))}
              </div>
            )}
          </Row>
        </div>
      </Row>
    </Container>
  );
};
export default MyProfile;
