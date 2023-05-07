import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row, Alert } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  POSTS_ROUTE,
  REGISTRATION_ROUTE,
} from "../utils/constants";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showAllert, setShowAllert] = useState(false);
  const [allertText, setAllertText] = useState();

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(POSTS_ROUTE);
    } catch (error) {
      setAllertText(error.response.data.message)
      setShowAllert(true);
      setTimeout(() => {
        setShowAllert(false);
      }, 5000);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        {showAllert && (
          <Alert key={"warning"} variant={"warning"}>
            {allertText}
          </Alert>
        )}
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-2"
            placeholder="введите email"
            value={email}
            onChange={(c) => {
              setEmail(c.target.value);
            }}
          />
          <Form.Control
            className="mt-2"
            placeholder="введите пароль"
            value={password}
            onChange={(c) => {
              setPassword(c.target.value);
            }}
            type="password"
          />
          <Row className="d-flex mt-2">
            {isLogin ? (
              <div>
                Нет аккаунта?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
              </div>
            )}
            <Button variant="outline-success" onClick={click}>
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
