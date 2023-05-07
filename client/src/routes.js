import {
  ADDPOST_ROUTE,
  LOGIN_ROUTE,
  POSTS_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/constants";
import Posts from "./pages/posts.page";
import Auth from "./pages/auth.page";
import AddPost from "./pages/addPost.page";

export const publicRoutes = [
  {
    path: POSTS_ROUTE,
    Component: Posts,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: ADDPOST_ROUTE,
    Component: AddPost,
  },
];
