import { useSelector } from "react-redux";
import { Container, Modal, Row } from "react-bootstrap";

const MyProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <Row>
        <div id="userPicBox">
          <div id="userPicButtonFilter"></div>
          <img alt={`${currentUser.firstName}`} src={`${currentUser.avatar}`} />
          <Modal id="changePicModal"></Modal>
        </div>
        <div id="nameBox">{currentUser.firstName}</div>
        <div id="recipeCount">
          I have Saved{" "}
          <span style={{ fontWeight: "bold", color: "green" }}>
            {currentUser.recipeBook.length}
          </span>{" "}
          Recipes in my book.
        </div>
      </Row>
      <Row>
        <div id="recipeInfoBox">
          <Row>
            <div id="recipeSearch"></div>
            <div id="recipeResults"></div>
          </Row>
        </div>
      </Row>
    </Container>
  );
};
export default MyProfile;
