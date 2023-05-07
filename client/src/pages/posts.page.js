import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form } from "react-bootstrap";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { deletePost, getPosts } from "./../http/postsApi";
import { POSTS_ROUTE } from "../utils/constants";

const Posts = observer(() => {
  const { user } = useContext(Context);
  const { posts } = useContext(Context);
  const navigate = useNavigate();
  const {isEdit, setEdit} = useState(false)
  const [message, setMessage] = useState("");

  useEffect(() => {
    getPosts().then((data) => posts.setPosts(data));
  }, []);

  const onDelete = (id) => {
    deletePost(id);
    navigate(POSTS_ROUTE)
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      {posts.posts.map((p) => {
        return (
          <Card key={p.id} className="mt-2" style={{ minWidth: 600 }}>
            <Card.Footer className="text-muted" style={{ fontSize: "10px" }}>
              {p.user.username}
            </Card.Footer>
            {p.file.length > 0 && (
              <Card.Img
                variant="top"
                style={{ maxWidth: 600 }}
                src={process.env.REACT_APP_API_URL + "/" + p.file}
              />
            )}
            <Card.Body>
              {isEdit ?
                     <Form.Control
              as="textarea"
              rows={7}
              className="mt-2"
              value={p.message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            :
            <Card.Text>{p.message}</Card.Text>
          }
            </Card.Body>

            <Card.Footer
              className="text-muted d-flex justify-content-between"
              style={{ fontSize: "10px" }}
            >
              {`${new Date(p.createdAt).toLocaleDateString("ru-RU")} ${new Date(
                p.createdAt
              ).toLocaleTimeString("ru-RU")}`}
              {user.user.id === p.user.id && (
                <Card.Text>
                  <button key={p.id}  onClick={() => setEdit(true)}>
                    Редактировать
                  </button>
                  <button
                    key={p.id}
                    onClick={() => onDelete(p.id)}
                  >
                    Удалить
                  </button>
                </Card.Text>
              )}
            </Card.Footer>
          </Card>
        );
      })}
    </Container>
  );
});

export default Posts;
