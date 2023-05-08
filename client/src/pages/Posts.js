import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { deletePost, getPosts, editPost } from "../http/postsApi";
import Pages from "../components/Pages";

const Posts = observer(() => {
  const { user } = useContext(Context);
  const { posts } = useContext(Context);
  const [isEdit, setEdit] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getPosts().then((data) => {
      posts.setPosts(data.rows);
      posts.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    getPosts(posts.page, posts.limit).then((data) => {
      posts.setPosts(data.rows);
      posts.setTotalCount(data.count);
    });
  }, [posts.page]);

  const onDelete = async (id) => {
    await deletePost(id);
    await getPosts().then((data) => posts.setPosts(data.rows));
    setEdit(0);
  };

  const onEdit = async () => {
    const formData = new FormData();
    formData.append("id", isEdit);
    formData.append("message", message);
    await editPost(formData);
    await getPosts().then((data) => posts.setPosts(data.rows));
    setEdit(0);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      {posts.posts.map((p) => {
        return (
          <Card key={p.id} className="mt-2" style={{ minWidth: 600 }}>
            <Card.Footer
              className="text-muted d-flex justify-content-between"
              style={{ fontSize: "10px" }}
            >
              <div>автор: {p.user.email}</div>{" "}
              <div>{`${new Date(p.createdAt).toLocaleDateString(
                "ru-RU"
              )} ${new Date(p.createdAt).toLocaleTimeString("ru-RU")}`}</div>
            </Card.Footer>
            {p.file.length > 0 && (
              <Card.Img
                variant="top"
                style={{
                  maxWidth: 600,
                  maxHeight: 600,
                  objectFit: "scale-down",
                }}
                src={process.env.REACT_APP_API_URL + "/" + p.file}
              />
            )}
            <Card.Body>
              {isEdit === p.id ? (
                <Form className="d-flex flex-column">
                  <Form.Control
                    as="textarea"
                    rows={7}
                    className="mt-2"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </Form>
              ) : (
                <Card.Text>{p.message}</Card.Text>
              )}
            </Card.Body>

            <Card.Footer
              className="text-muted d-flex justify-content-end"
              style={{ fontSize: "10px" }}
            >
              {user.user.id === p.user.id && isEdit === p.id && (
                <Card.Text>
                  <Button
                    className="ml-2"
                    variant="light"
                    size="sm"
                    key={p.id}
                    onClick={onEdit}
                  >
                    Применить
                  </Button>
                  <Button
                    className="ml-2"
                    variant="light"
                    size="sm"
                    key={p.id}
                    onClick={() => setEdit(0)}
                  >
                    Отмена
                  </Button>
                </Card.Text>
              )}
              {user.user.id === p.user.id && isEdit !== p.id && (
                <Card.Text>
                  <Button
                    className="ml-2"
                    variant="light"
                    size="sm"
                    key={p.id}
                    onClick={() => {
                      setEdit(p.id);
                      setMessage(p.message);
                    }}
                  >
                    Редактировать
                  </Button>
                  <Button
                    className="ml-2"
                    variant="light"
                    size="sm"
                    key={p.id}
                    onClick={() => onDelete(p.id)}
                  >
                    Удалить
                  </Button>
                </Card.Text>
              )}
            </Card.Footer>
          </Card>
        );
      })}
      <Pages />
    </Container>
  );
});

export default Posts;
