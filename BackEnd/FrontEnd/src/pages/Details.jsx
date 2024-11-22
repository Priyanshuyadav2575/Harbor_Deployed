import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setblogs] = useState({});
  console.log(blogs);
  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/blogs/single-blog/${id}`,

          {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        setblogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblogs();
  }, [id]);
  return (
    <div>
      <div>
        {blogs && (
          <section className="container mx-auto p-4 bg-black">
            <div className="text-pink-700 uppercase text-xs font-bold mb-4">
              {blogs?.catagory}
            </div>
            <h1 className="text-4xl font-bold mb-6 text-white">{blogs?.tittle}</h1>
            <div className="flex items-center mb-6">
              <img
                src={blogs?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold text-white">{blogs?.adminName}</p>
            </div>

            <div className="flex flex-col md:flex-row text-white">
              {blogs?.blogImage && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6 text-white">{blogs?.about}</p>
                {/* Add more content here if needed */}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Detail;
