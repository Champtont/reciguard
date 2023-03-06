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
          <span style={{ fontWeight: "bold" }}>eciGuard</span>
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
                  title="Options"
                  id="basic-nav-dropdown"
                  className="userDropdown"
                >
                  <Link to="/myProfile">
                    <div className="dropDownMenuItem">My Profile</div>
                  </Link>
                  <Link to="/myCalendar">
                    <div className="dropDownMenuItem">Calendar</div>
                  </Link>
                  <Link to="/myShoppingList">
                    <div className="dropDownMenuItem">Shopping List</div>
                  </Link>
                  <Link to="/home">
                    <div className="dropDownMenuItem">Home</div>
                  </Link>
                  <NavDropdown.Divider />
                  <div className="dropDownMenuItem">
                    <button onClick={() => onLogOut()}>Logout</button>
                  </div>
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
