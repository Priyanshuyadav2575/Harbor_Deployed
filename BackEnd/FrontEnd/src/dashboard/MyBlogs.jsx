import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/blogs/my-blog",
          { withCredentials: true }
        );
        console.log(data);
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete blog");
      });
  };

  return (
    <div className="flex">
      {/* Sidebar space */}
      <div className="hidden lg:block w-1/4 bg-gray-200 p-4">
        {/* Sidebar content goes here */}
        <p className="text-center text-gray-500">Sidebar Content</p>
      </div>

      <div className="containers mx-auto my-8 p-4 w-full lg:w-3/4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                className="bg-white shadow-md rounded-md overflow-hidden w-full mx-auto"
                key={element._id}
              >
                {element?.blogImage && (
                  <img
                    src={element?.blogImage.url}
                    alt="blogImg"
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-xs text-gray-500">
                    {element.category}
                  </span>
                  <h4 className="text-sm font-semibold my-2">
                    {element.title}
                  </h4>
                  <div className="flex justify-between mt-2">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 text-xs bg-white rounded-md shadow-sm px-2 py-1 border border-gray-300 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 text-xs bg-white rounded-md shadow-sm px-2 py-1 border border-gray-300 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
