import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { MdExitToApp } from "react-icons/md";
import { TiPlusOutline } from "react-icons/ti";
import { changeUserAvatar } from "../../../redux/actions";
import SingleRecipe from "../Recipes/SingleRecipe";
import NameInput from "./NameInput";
import AddNewRecipeModal from "../Recipes/AddNewRecipeModal";
import { Form } from "react-bootstrap";

const MyProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userRecipes = useSelector((state) => state.user.userRecipes);
  const favorites = useSelector((state) => state.user.favorites);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavs, setShowFavs] = useState(false);
  const [isSelected, setSelected] = useState(false);
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
    setSelected(false);
  };

  return (
    <div id="profileBox">
      <div id="topOfPage"></div>
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
            <img
              className="fluid"
              alt={`${currentUser.firstName}`}
              src={`${currentUser.avatar}`}
            />
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
                <div className="photoInputs">
                  <div id="fileInputCover">
                    <input
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setFileName(e.target.files[0].name);
                      }}
                      type="file"
                      id="myFile"
                      name="filename"
                    ></input>
                    <Button>Choose File</Button>
                    <input type="text" value={fileName} readOnly />
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
                  style={{ animation: "threesixty 3s infinite linear" }}
                >
                  <FiEdit2 size={26} />
                </div>
              )}
            </div>
          </div>
          <div id="recipeCount">
            You have Saved{" "}
            <span style={{ fontWeight: "bold", color: "green" }}>
              {currentUser.recipeBook.length}
            </span>{" "}
            Recipe(s) in your book.
          </div>
        </div>
        <Row>
          <div id="recipeInfoBox">
            <Row>
              <h3>
                {!showFavs && (
                  <Button
                    id="addNewReciBtn"
                    onClick={() => setEdit("addNewReci")}
                  >
                    <TiPlusOutline size={26} />
                  </Button>
                )}

                {showFavs === false ? "My Recipes" : "My Favorites"}
                <Button
                  id="seeFavs"
                  onClick={() => {
                    if (showFavs === false) {
                      setShowFavs(true);
                    } else {
                      setShowFavs(false);
                    }
                  }}
                >
                  {showFavs === false ? "Favs" : "My Book"}
                </Button>
              </h3>
              {edit === "addNewReci" && <AddNewRecipeModal setEdit={setEdit} />}
            </Row>
            {showFavs === false ? (
              <Row>
                {userRecipes !== null && (
                  <div id="recipeResults">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Search here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Form.Group>
                    <div id="reciCardBox">
                      {currentUser.recipeBook.length === 0 && (
                        <h3>
                          You do not Have any recipes saved yet. try writing a
                          recipe to get started!
                        </h3>
                      )}
                      {userRecipes
                        .filter((r) =>
                          r.title.toLowerCase().includes(searchQuery)
                        )
                        .map((recipe) => (
                          <SingleRecipe
                            key={recipe._id}
                            recipe={recipe}
                            setEdit={setEdit}
                            edit={edit}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </Row>
            ) : (
              <Row>
                <div id="recipeSearch"></div>
                {favorites !== null && (
                  <div id="recipeResults">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Search here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Form.Group>
                    <div id="reciCardBox">
                      {favorites
                        .filter((r) =>
                          r.title.toLowerCase().includes(searchQuery)
                        )
                        .map((recipe) => (
                          <SingleRecipe
                            key={recipe._id}
                            recipe={recipe}
                            setEdit={setEdit}
                            edit={edit}
                            showFavs={showFavs}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </Row>
            )}
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default MyProfile;
