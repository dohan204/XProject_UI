import {createRoot} from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';  // ⭐ Thêm dòng này

import Login from './auth/login_register/Login'
import Register from './auth/login_register/Register'
import AuthLayout from './auth/login_register/AuthLayout'
import ProtectedRoute from './layout/route/ProtectedRoute'
import MainLayout from './layout/MainLayout'

import HomePage from './pages/publicPage/HomePage'
import About from './pages/publicPage/About'
import Feature from './pages/publicPage/Feature'
import News from './pages/publicPage/News'
import TestFree from './pages/publicPage/Homepage/TestFree'

import TestPage from './pages/protectedPage/subjectExam/TestPage'
import Exam from './pages/protectedPage/subjectExam/Exam'
import TestResult from './pages/protectedPage/subjectExam/TestResult'
import Profile from './pages/protectedPage/user/Profile'
import RatingGeneric from './pages/protectedPage/RatingGeneric'

import NotFoundPage from './auth/NotFoundPage'
import SubjectName from "./pages/protectedPage/subjectExam/SubjectName";
import GroupUser from "./pages/protectedPage/group/GroupUser";
import FavoriteExam from "./pages/protectedPage/user/FavoriteExam";
import HistoryExamWithUser from "./pages/protectedPage/user/HistoryExamWithUser";
import UserSettings from "./pages/protectedPage/UserSettings";

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
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "test/:id", element: <TestPage /> },
          { path: "test/:id/result", element: <TestResult /> },
          { path: "subject/:code", element: <Exam /> },
          {path: "profile", element: <Profile />},
          {path: "user/favoriteExam", element: <FavoriteExam /> },
          {path: "user/history", element: <HistoryExamWithUser />},
          {path: "user/settings", element: <UserSettings />},
          { path: "group", element: <GroupUser /> },
          { path: "ratingeneric", element: <RatingGeneric /> },
          { path: "subject", element: <SubjectName /> }
        ],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>  {/* ⭐ Wrap ở đây */}
    <RouterProvider router={router} />
  </AuthProvider>
);