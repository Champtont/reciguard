import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editUser } from "../../../redux/actions";
import { FiSave } from "react-icons/fi";

const NameInput = (props) => {
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(editUser(props.editedUser));
  };

  return (
    <>
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.setName(e.target.value)}
        name="Users Name"
        placeholder="userName will go here"
        maxLength={25}
        autoFocus
      />
      <Button onClick={() => submitHandler()}>
        <FiSave />
      </Button>
      <Button variant="danger" onClick={() => props.setEdit(null)}>
        X
      </Button>
    </>
  );
};

export default NameInput;
