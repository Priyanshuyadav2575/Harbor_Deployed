
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    
      const onSubmit = async (data) => {
        const userInfo = {
          access_key: "6c8cf593-9f6e-4ad3-9d4b-d44b68683a27",
          name: data.username,
          email: data.email,
          message: data.message,
        };
        try {
          await axios.post("https://api.web3forms.com/submit", userInfo);
          toast.success("Message sent successfully");
        } catch (error) {
          toast.error("An error occurred"+error);
        }
      };
    return (
        <>
        <div>
      <div className="bg-pink-400 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8 bg-black p-10 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Contact Us
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
              <h3 className="text-lg font-medium text-white mb-4">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <span className="text-sm text-red-500 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <span className="text-sm text-red-500 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-pink-900 text-white px-4 py-2 rounded-lg hover:bg-red-500 duration-300 "
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Contact Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-red-500" />
                  <span className="text-white">+91 7017698416</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEnvelope className="text-pink-500" />
                  <span className="text-white">priyanshuyadav7017@gmail.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-green-500" />
                  <span className="text-white">Kanpur, Uttarpradesh, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
        
        </>
    )
}

export default Contact
