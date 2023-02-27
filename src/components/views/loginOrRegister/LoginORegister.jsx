import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseAPI, user, newUser } from "../../../redux/actions/index.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(baseAPI + user, {
        email,
        password,
      });
      toast("Login successfull! 💪", { autoClose: 1000 });
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/main");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <Container fluid className="p-5">
      <Row>
        <Col col="4" md="6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(val) => setEmail(val.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(val) => setPassword(val.currentTarget.value)}
              />
            </Form.Group>

            <Button className="mb-4 w-100" size="lg" type="submit">
              Sign in
            </Button>

            <div className="d-flex justify-content-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <a href="http://localhost:3001/users/googleLogin">
              <Button
                className="mb-4 w-100"
                size="lg"
                style={{ backgroundColor: "#55acee" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google mx-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                Login with Google
              </Button>
            </a>
          </Form>
        </Col>
      </Row>
      <Row>{error && <Alert variant="danger">{error}</Alert>}</Row>
    </Container>
  );
};
export default LoginPage;
