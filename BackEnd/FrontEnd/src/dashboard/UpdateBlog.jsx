;

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [tittle, setTittle] = useState("");
  const [catagory, setCatagory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `https://harbor-deployed.onrender.com/api/blogs/single-blog/${id}`,

          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        setTittle(data?.tittle);
        setCatagory(data?.catagory);
        setAbout(data?.about);
        setBlogImage(data?.blogImage.url);
      } catch (error) {
        console.log(error);
        toast.error("Please fill the required fields");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tittle", tittle);
    formData.append("catagory", catagory);
    formData.append("about", about);

    formData.append("blogImage", blogImage);
    try {
      const { data } = await axios.put(
        `https://harbor-deployed.onrender.com/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Please fill the required fields"
      );
    }
  };

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <section className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={catagory}
                onChange={(e) => setCatagory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
                <option value="Valorant">Valorant</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              className="w-full p-2 mb-4 border rounded-md"
              value={tittle}
              onChange={(e) => setTittle(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2 font-semibold">BLOG IMAGE</label>
              <img
                src={
                  blogImagePreview
                    ? blogImagePreview
                    : blogImage
                    ? blogImage
                    : "/imgPL.webp"
                }
                alt="Blog Main"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <input
                type="file"
                className="w-full p-2 border rounded-md"
                onChange={changePhotoHandler}
              />
            </div>
            <textarea
              rows="6"
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Something about your blog atleast 200 characters!"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <button
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UpdateBlog;
