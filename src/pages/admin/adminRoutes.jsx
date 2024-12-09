import React from "react";
import { useParams } from "react-router-dom";
import UserManagementPage from "./users.jsx";
import PostManagementPage from "./posts.jsx";

const AdminRoutes = () => {
    const route = useParams();

    if (route.route === "users") {
        return (
            <UserManagementPage />
        )
    } else if (route.route === "posts") {
        return (
            <PostManagementPage />
        )
    }
}

export default AdminRoutes;