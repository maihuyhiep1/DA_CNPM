import React from "react";
import { useParams } from "react-router-dom";
import UserManagementPage from "./users.jsx";
import PostManagementPage from "./posts.jsx";
import ReportsPage from "../moderator/moderator.jsx";

const AdminRoutes = ({isAdmin}) => {
    const route = useParams();

    if (route.route === "users") {
        return (
            <UserManagementPage isadmin={isAdmin}/>
        )
    } else if (route.route === "posts") {
        return (
            <PostManagementPage />
        )
    } else {
        return (
            <ReportsPage/>
        )
    }
}

export default AdminRoutes;