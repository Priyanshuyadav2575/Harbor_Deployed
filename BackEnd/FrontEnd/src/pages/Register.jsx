import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const navigate = useNavigate();  // Initialize navigate function

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "https://harbor-deployed.onrender.com/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "User registered successfully");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      
      // Redirect to login page after successful registration
      navigate("/login");  // This will redirect to the login page
    } catch (error) {
      toast.error(error.response?.data?.message || "Please fill required fields");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section with Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-pink-400 shadow-md p-4">
        <div className="w-full max-w-md">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="text-2xl font-bold flex gap-1 justify-center items-center">
              <img
                src="android-chrome-192x192.png"
                alt="Harb⚓R Logo"
                className="h-10 w-16 mt-1"
              />
              <span className="text-blue-700">Harb⚓R</span>
            </div>
            <h1 className="text-black font-bold text-xl text-center mx-12 font-mono">
              Register
            </h1>

            {/* Role Dropdown */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-blue-500 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
            </select>

            {/* Name Input */}
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-blue-500 rounded-md"
            />

            {/* Email Input */}
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-blue-500 rounded-md"
            />

            {/* Phone Input */}
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-blue-500 rounded-md"
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-blue-500 rounded-md"
            />

            {/* Education Dropdown */}
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 border border-blue-500 rounded-md"
            >
              <option value="">Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
              <option value="BCOM">BCOM</option>
            </select>

            {/* Photo Upload */}
            <div className="flex items-center">
              <div className="photo w-20 h-20 mr-4">
                <img
                  src={photoPreview ? `${photoPreview}` : "Photo"}
                  alt="Preview"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full p-2 border border-blue-500 rounded-md"
              />
            </div>

            {/* Login Link */}
            <p className="text-center">
              Already Registered?
              <Link to="/login" className="text-blue-600">
                {" "}
                Login Now
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="w-full md:w-1/2 relative mt-4 md:mt-0">
        <img
          src="background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <marquee direction="left" className="w-full">
            <h1 className="text-white text-2xl md:text-4xl font-bold">
              Sail into the world of blogging with Harb⚓R
            </h1>
          </marquee>
        </div>
      </div>
    </div>
  );
}

export default Register;
