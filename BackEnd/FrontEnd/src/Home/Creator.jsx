import axios from "axios";
import { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/users/admins",
          { withCredentials: true }
        );
        console.log(data);
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Popular Creators</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {admin && admin.length > 0 ? (
          admin.slice(0, 5).map((element) => (
            <div
              key={element._id}
              className="flex flex-col items-center bg-white shadow-md rounded-lg p-3"
            >
              <img
                src={element.photo.url}
                alt={element.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover border border-blue-500 rounded-full"
              />
              <div className="text-center mt-2">
                <p className="text-sm font-semibold">{element.name}</p>
                <p className="text-gray-500 text-xs">{element.role}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No creators found
          </p>
        )}
      </div>
    </div>
  );
}

export default Creator;
