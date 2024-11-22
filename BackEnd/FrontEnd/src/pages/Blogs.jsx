import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  console.log(blogs);  // Ensure the blogs data is being logged correctly

  return (
    <div className="bg-pink-300">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">All Blogs here!!!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}  // Use `blog._id` instead of `blogs._id`
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.tittle}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.tittle}</h2>
                  <p className="text-sm">{blog?.catagory}</p>
                </div>
              </Link>
            ))
          ) : (
            <div>No blogs available</div>  // Show a fallback message if no blogs are found
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
