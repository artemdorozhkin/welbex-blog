import React, { useContext } from "react";
import { Context } from "..";
import { Navbar, Container, Nav, Button, NavItem } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, POSTS_ROUTE,ADDPOST_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={POSTS_ROUTE}>
          Welbex BLOG
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <div style={{ padding: 5 }}>{user.user.email}</div>
            <Button variant={"outline-light"} className="mr-2"  onClick={() => logOut()}>
              Добавить пост
            </Button>
            <Button variant={"outline-light"} onClick={navigate(ADDPOST_ROUTE)}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
