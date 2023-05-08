import React, { useContext } from "react";
import { Context } from "..";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, POSTS_ROUTE, ADDPOST_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const isAddPost = location.pathname === ADDPOST_ROUTE;

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
            <Button
              variant={"outline-light"}
              onClick={() =>
                isAddPost ? navigate(POSTS_ROUTE) : navigate(ADDPOST_ROUTE)
              }
            >
              {isAddPost ? "На главную" : "Добавить пост"}
            </Button>
            <Button
              variant={"outline-light"}
              className="ml-2"
              onClick={() => logOut()}
            >
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
