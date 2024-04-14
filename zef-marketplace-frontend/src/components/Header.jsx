import React from "react";
import { Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../redux/slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const {userInfo} = useSelector(state => state.auth)
  const [logout] = useLogoutMutation();
  const logoutHandler = async() => {
    try {
      const res = await logout().unwrap();
      console.log(res);
      if (res.message === "logged out successfully") {
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <Navbar
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="p-3"
        style={{ backgroundColor: "#250d46" }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-warning fs-4">Zef-Marketplace</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
      {userInfo && userInfo?.role === "user"&& 
        <>
        <Image src={userInfo?.profilePhoto?.url} fluid width={40} height={40} roundedCircle/>
                <NavDropdown title={userInfo?.name} id="adminmenue">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
      }

      {userInfo && userInfo?.role === "admin" && 
        <>
        <Image src={userInfo?.profilePhoto?.url} fluid width={40} height={40} roundedCircle/>
                <NavDropdown title={"Admin : " + userInfo?.name} id="adminmenue">
                  <LinkContainer to="/admin">
                    <NavDropdown.Item>Admin dashBoard</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
      }
  
  {!userInfo&& !userInfo?.name &&
    <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    {" "}
                    <i className="bi bi-person"></i> Login
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/register">
                  <Nav.Link>
                    {" "}
                    <i className="bi bi-person"></i> Register
                  </Nav.Link>
                </LinkContainer>
              </>
  }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
