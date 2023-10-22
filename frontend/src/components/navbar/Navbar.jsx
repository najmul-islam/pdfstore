import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand>
          <Link to="/">React-Bootstrap</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>

        {user ? (
          <Navbar.Collapse id="basic-navbar-nav justify-content-end">
            <Nav className="me-auto">
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/user/drive">My Drive</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/user/likes">My Likes</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/user/upload">Upload</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/auth/edit">Account Settings</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/" onClick={onLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Link to="/auth/signin">
            <Button variant="outline-primary">Sign in</Button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
