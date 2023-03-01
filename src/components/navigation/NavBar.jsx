import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ReciLogo from "../assets/googlereadyreci.png";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className="nav" expand="lg">
      <Container>
        <Link to="/home">
          <img src={ReciLogo} alt="Reci logo" id="navLogo" />
          eciGuard
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span>
            <HiMenu id="hamburgermenu" size={26} />
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-spacer">
            <Link href="#home">Home</Link>
            <Link href="#link">About Us</Link>
            <NavDropdown
              title="Dropdown"
              id="basic-nav-dropdown"
              className="userDropdown"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
