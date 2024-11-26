import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext, useEffect } from "react";

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

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
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