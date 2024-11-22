import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  console.log(profile);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-pink-400 p-4">
        <div className="bg-black shadow-lg rounded-lg overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="relative">
            {/* Profile cover image */}
            <img
              src={profile?.photo?.url}
              alt="avatar"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              {/* Profile avatar */}
              <img
                src={profile?.photo?.url}
                alt="avatar"
                className="w-24 h-24 rounded-full mx-auto border-4 border-red-500"
              />
            </div>
          </div>
          <div className="px-6 py-8 mt-2">
            {/* Profile Name */}
            <h2 className="text-center text-2xl font-semibold text-white">
              {profile?.name}
            </h2>
            {/* Profile Email */}
            <p className="text-center text-white mt-2">{profile?.email}</p>
            {/* Profile Phone */}
            <p className="text-center text-white mt-2">{profile?.phone}</p>
            {/* Profile Role */}
            <p className="text-center text-white mt-2">{profile?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
