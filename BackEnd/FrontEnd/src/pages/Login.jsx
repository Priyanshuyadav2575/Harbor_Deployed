import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Function to play success sound
  const playSuccessSound = () => {
    const audio = new Audio("/login.mp3");  // Adjust the path if needed
    audio.play();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.token) {
        // Save token in localStorage
        localStorage.setItem("jwt", data.token);
        toast.success(data.message || "Login successful");

        // Play the success sound
        playSuccessSound();

        console.log("Token stored successfully:", data.token);
        console.log("Navigating to dashboard...");
        navigateTo("/dashboard");
      }

      // Clear input fields
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-pink-400">
        <div className="w-full max-w-md bg-black shadow-md rounded-lg p-6">
          <form onSubmit={handleLogin}>
            <div className="text-2xl font-bold flex gap-1 justify-center items-center mt-6">
              <img
                src="android-chrome-192x192.png"
                alt=""
                className="h-10 w-16 mt-1"
              />
              <span className="text-blue-700">Harb⚓R</span>
            </div>
            <h1 className="text-white font-bold text-xl text-center mx-12 font-mono">
              Login
            </h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-2 mb-4 border border-blue-500 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 mb-4 border border-blue-500 rounded-md"
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 mb-4 border border-blue-500 rounded-md"
            />
            <p className="text-center text-white mb-4">
              New User? <Link to="/register" className="text-blue-600">Register Now</Link>
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800 duration-300 rounded h-10 text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('background.png')" }}
      >
        <div className="bg-black bg-opacity-30 flex items-center justify-center">
          <marquee direction="left">
            <h1 className="text-white text-4xl font-bold">Welcome to Harb⚓R</h1>
          </marquee>
        </div>
      </div>
    </div>
  );
}

export default Login;
