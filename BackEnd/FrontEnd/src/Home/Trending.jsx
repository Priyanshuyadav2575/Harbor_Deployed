import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  // Sort blogs by creation date in descending order and take the first 10
  const sortedBlogs = blogs && blogs.length > 0 
    ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10)
    : [];

  // Responsive breakpoints for the carousel
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-center mb-6">Trending Blogs</h1>
      <Carousel responsive={responsive} className="pb-8">
        {sortedBlogs.length > 0 ? (
          sortedBlogs.map((element) => (
            <div
              key={element._id}
              className="p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg mx-2"
            >
              <Link to={`/blog/${element._id}`}>
                {/* Blog Image */}
                <div className="relative">
                  <img
                    src={element.blogImage.url}
                    alt={element.tittle}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 bg-blue-700 text-white px-2 py-1 rounded-full text-xs">
                    {element.catagory}
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-3 text-white">
                  <h2 className="text-sm font-bold truncate">{element.tittle}</h2>
                  <div className="flex items-center mt-2">
                    <img
                      src={element.adminPhoto}
                      alt={element.adminName}
                      className="w-8 h-8 rounded-full border-2 border-blue-600"
                    />
                    <div className="ml-2">
                      <p className="text-xs font-semibold">{element.adminName}</p>
                      <p className="text-xs text-gray-400">Recently Published</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-lg text-center">No trending blogs available.</div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
