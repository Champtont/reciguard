import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ReciLogo from "../assets/googlereadyreci.png";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { feURL } from "../../redux/actions";

//still working on navbar options. Don't want them all to show on

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogOut = () => {
    localStorage.removeItem("UserAccessToken");
    localStorage.removeItem("firstName");
    navigate("/");
  };

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
            {location.pathname !== "/" && (
              <>
                <NavDropdown
                  title="Dropdown"
                  id="basic-nav-dropdown"
                  className="userDropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    <Link to="/myProfile">My Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <Link to="/home">Home</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    <button onClick={() => onLogOut()}>Logout</button>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            <Link href="#link">About Us</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
