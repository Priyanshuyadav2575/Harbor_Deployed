import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import UpdateBlog from "../dashboard/UpdateBlog";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import toast from "react-hot-toast";

import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  const location = useLocation();

  console.log("User Profile:", profile);
  console.log("Is Authenticated:", isAuthenticated);

  // Redirect unauthenticated users to login page with alert
  if (!isAuthenticated) {
    toast.error("Please 🩷login first to access the dashboard ⭐if you are logined then 🔃  refresh the page⭐");
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
