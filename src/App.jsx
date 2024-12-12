import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";

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
import FullPost from "./components/fullPost/fullPost";
import AdminDashboard from "./pages/admin/admin";
import AdminRoutes from "./pages/admin/adminRoutes";

import Navbar from "./components/navbar/Navbar";
import ReportsPage from "./pages/moderator/moderator";
import ReportDetailPage from "./pages/moderator/detailPage";
import Footer from "./components/footer/Footer";
import AddQnA from "./components/stories/addQnA";
import Dropdown from "./components/post/dropdown";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (searchContent) => {
    try {
      if (!searchContent.trim()) {
        console.warn("Search query is empty.");
        toast.warn("Search query is empty.");
        return;
      }
      const response = await fetch(
        `http://localhost:8386/api/posts/search?query=${searchContent}`
      );
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error("Search API Error:", error);
      toast.error("Search API error");
    }
  };

  const Layout = () => {
    return (
      <div>
        <Navbar handleSearch={handleSearch} />
        <Outlet />
        <Footer />
        {/* <Dropdown/> */}
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home posts={posts}/>,
        },
        {
          path: "/profile",
          element: <AvtAndInformation />,
        },
        {
          path: "/create-post",
          element: <CreatePost />,
        },
        {
          path: "/post/:id",
          element: <FullPost />,
        },
        {
          path: "/update-info",
          element: <SetupInformation />,
        },
        {
          path: "/report/:postId",
          element: <ReportDetailPage />,
        },
        {
          path: "/admin",
          element: <AdminDashboard isAdmin={currentUser && currentUser.role==="admin"}/>,
        },
        {
          path: "/admin/:route",
          element: <AdminRoutes />,
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

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

// writeComment run test
// const App = () => {
//   const handleSubmit = (comment) => {
//     console.log('Dữ liệu gửi:', comment);
//     alert(`Bình luận của bạn: ${comment}`);
//   };

//   return (
//     <div>
//       <h1>Viết bình luận</h1>
//       <WriteComment
//         placeholder="Nhập bình luận của bạn..."
//         onSubmit={handleSubmit}
//         avatarUrl="img_profile/avt.png" // Đường dẫn ảnh avatar
//       />
//     </div>
//   );
// };
// export default App;
