import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import SignIn from "./pages/signin/SignIn";
import SetupInformation from "./pages/signup/SetupInformation";
import Verify from "./pages/verify/Verify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import CreatePost from './components/createPost'
import AvtAndInformation from "./pages/profile/avtAndInformation";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword"
import RePassword from "./pages/rePassword/RePassword";

function App() {
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    // This will run when the component mounts and after every redirect
    const fetchUserData = async () => {
      try {
        // Check if user is authenticated by calling the backend
        const res = await axios.get('http://localhost:8386//login-success ', { withCredentials: true });
        setCurrentUser(res.data);  // Update context with user data
        if (!currentUser) {
          // If no user data is found, redirect to login page
          navigate('/login');
        }
      } catch (err) {
        console.error('Error fetching user data', err);
        setCurrentUser(null);  // If error, reset context
      }
    };
  }
  )

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      element: (
        <Layout />
      ),
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
