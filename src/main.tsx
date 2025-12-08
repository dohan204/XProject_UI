import React from "react";
import {createRoot} from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import Login from './auth/login_register/Login'
import Register from './auth/login_register/Register'
import AuthLayout from './auth/login_register/AuthLayout'
import ProtectedRoute from './layout/route/ProtectedRoute'
import MainLayout from './layout/MainLayout'

import HomePage from './pages/publicPage/HomePage'
import About from './pages/publicPage/About'
import Feature from './pages/publicPage/Feature'
import News from './pages/publicPage/News'
import Tutorials from './pages/publicPage/Tutorials'
import Contact from './pages/publicPage/Contact'
import TestFree from './pages/publicPage/Homepage/TestFree'

import TestPage from './pages/protectedPage/subjectExam/TestPage'
import Exam from './pages/protectedPage/subjectExam/Exam'
import TestResult from './pages/protectedPage/subjectExam/TestResult'
import Profile from './pages/protectedPage/user/Profile'
import RatingGeneric from './pages/protectedPage/RatingGeneric'

import NotFoundPage from './auth/NotFoundPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "freetest", element: <TestFree openTest={true} /> },
      { path: "freetest/:id/result", element: <TestResult /> },
      { path: "about", element: <About /> },
      { path: "feature", element: <Feature /> },
      { path: "news", element: <News /> },
      { path: "tutorials", element: <Tutorials /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  // Public routes
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "test/:id", element: <TestPage /> },
          { path: "test/:id/result", element: <TestResult /> },
          { path: "subject/:code", element: <Exam /> },
          { path: "profile", element: <Profile /> },
          { path: "ratingeneric", element: <RatingGeneric /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);


