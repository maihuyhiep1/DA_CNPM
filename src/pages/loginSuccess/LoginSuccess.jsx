import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const LoginSuccess = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch user info from the backend
        const res = await axios.get("http://localhost:8386/login-success", {
          withCredentials: true,
        });

        console.log("Lấy thông tin người dùng:", res);
        setCurrentUser(res.data.user);

        // Redirect to the homepage or another page
        navigate("/");
      } catch (err) {
        console.error("Error fetching user details:", err);
        toast("Không thể lấy thông tin người dùng.");
        navigate("/login"); // Redirect to login page on error
      }
    };

    fetchUserDetails();
  }, [navigate, setCurrentUser]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default LoginSuccess;
