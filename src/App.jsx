import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContext } from "./context/authContext";

import Login from "./pages/login/Login";
import SignIn from "./pages/signin/SignIn";
import SetupInformation from "./pages/signup/SetupInformation";
import Verify from "./pages/verify/Verify";
import Home from "./pages/home/Home";
import AvtAndInformation from "./pages/profile/avtAndInformation";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import RePassword from "./pages/rePassword/RePassword";
import CreatePost from "./pages/createPost/createPost";

import WriteComment from "./components/writeComment/writeComment";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import RepplyComment from "./components/writeComment/repplyComment";
import StoryCard from "./components/storyCard/StoryCard";
import QnAContent from "./components/QnA_Content/QnAContent";
import QnABar from "./components/QnABar/QnABar";
import NewNavbar from "./components/navbar/NewNavBar";
import CommentContent from "./components/commentContent/commentContent";
import RepplyCommentContent from "./components/commentContent/repplycommentContent";

function App() {
  const Layout = () => {
    return (
      <div>
        <QnAContent />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <AvtAndInformation />,
        },
        {
          path: "/create-post",
          element: <CreatePost />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SetupInformation />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/re-password",
      element: <RePassword />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
