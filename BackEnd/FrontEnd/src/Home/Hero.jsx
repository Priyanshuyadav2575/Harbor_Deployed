import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 5).map((element) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Blog Image */}
              <div className="relative">
                <img
                  src={element.blogImage.url}
                  alt={element.tittle}
                  className="w-full h-32 sm:h-36 md:h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 hover:opacity-100 transition-opacity duration-300"></div>
                <h1 className="absolute bottom-4 left-4 text-white text-sm sm:text-lg font-bold transition-colors duration-300">
                  {element.tittle}
                </h1>
              </div>

              {/* Blog Admin Info */}
              <div className="p-3 flex items-center gap-3">
                <img
                  src={element.adminPhoto}
                  alt={element.adminName}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-yellow-500"
                />
                <div>
                  <p className="text-sm sm:text-lg font-semibold text-gray-800">
                    {element.adminName}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">New</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center">
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
