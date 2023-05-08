import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "../routes";
import { POSTS_ROUTE } from "../utils/constants";

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} Component={Component} exact />
      ))}
      <Route path="*" element={<Navigate to={POSTS_ROUTE} replace />}/>
    </Routes>
  );
};

export default AppRouter;
