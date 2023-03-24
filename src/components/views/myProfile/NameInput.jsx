import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editUser } from "../../../redux/actions";
import { FiSave } from "react-icons/fi";
import { FaRegWindowClose } from "react-icons/fa";

const NameInput = (props) => {
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(editUser(props.editedUser));
    props.setEdit(null);
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
      <Button id="submitName" onClick={() => submitHandler()}>
        <FiSave size={23} />
      </Button>
      <Button id="cancelNameChange" onClick={() => props.setEdit(null)}>
        <FaRegWindowClose size={23} />
      </Button>
    </>
  );
};

export default NameInput;
