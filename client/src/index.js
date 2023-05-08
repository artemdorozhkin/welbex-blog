import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import UserStore from "./store/user.store";
import PostsStore from "./store/posts.store";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        posts: new PostsStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
