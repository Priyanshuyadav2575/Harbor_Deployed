import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Creators from "./pages/Creators";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Adjusted case in import
import { useAuth } from "./context/AuthProvider";
import { Toaster } from 'react-hot-toast';
import UpdateBlog from "./dashboard/UpdateBlog";
import Detail from "./pages/Details";

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);

  const { blogs } = useAuth();
  console.log(blogs);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="/blog/:id" element={<Detail/>} />
        
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
