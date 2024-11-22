import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.catagory === "Devotion");

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Devotional
      </h1>
      <p className="text-center mb-8 text-gray-700">
        The concept of gods varies widely across different cultures, religions,
        and belief systems.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {devotionalBlogs && devotionalBlogs.length > 0 ? (
          devotionalBlogs.slice(0, 5).map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="relative bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={blog?.blogImage?.url}
                alt={blog?.title}
                className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
              />
              <div className="p-2 text-center">
                <h2 className="text-sm font-semibold truncate">
                  {blog?.tittle}
                </h2>
                <p className="text-xs text-gray-500">{blog?.catagory}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center col-span-full">
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Devotional;
