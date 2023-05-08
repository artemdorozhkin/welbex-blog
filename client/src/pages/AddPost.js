import React, { useContext, useState } from "react";
import { Container, Form, Row, Button, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { POSTS_ROUTE } from "../utils/constants";
import { createPost } from "../http/postsApi";

const AddPost = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [showAllert, setShowAllert] = useState(false);
  const [allertText, setAllertText] = useState();

  const addPost = async () => {
    try {
      const formData = new FormData();
      console.log(message);
      formData.append("userId", user.user.id);
      formData.append("message", message);
      formData.append("file", file);
      await createPost(formData);
      navigate(POSTS_ROUTE);
    } catch (error) {
      setAllertText(error.response.data.message);
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
        <h2 className="m-auto">Новый пост</h2>
        {showAllert && (
          <Alert key={"warning"} variant={"warning"}>
            {allertText}
          </Alert>
        )}
        <Form className="d-flex flex-column">
          <Form.Control
            as="textarea"
            rows={7}
            className="mt-2"
            placeholder="Введите текст"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <input
            type="file"
            accept="image/*"
            className="d-flex mt-2"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <Row className="d-flex mt-2">
            <Button variant="outline-success" onClick={addPost}>
              Добавить
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default AddPost;
