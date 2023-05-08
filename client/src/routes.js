import {
  ADDPOST_ROUTE,
  LOGIN_ROUTE,
  POSTS_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/constants";
import Posts from "./pages/Posts";
import Auth from "./pages/Auth";
import AddPost from "./pages/AddPost";

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
