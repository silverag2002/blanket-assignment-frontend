import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../base/hooks/useUser";
import toast, { Toaster } from "react-hot-toast";

export default function ImageGrid({ images }) {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  function handleDelete(id) {
    axiosInstance
      .post(URLConstants.deleteImage(user?._id), { imageKey: user?.images[id] })
      .then((res) => {
        if (res?.data?.user) {
          setUser(res.data.user);
        }
        toast.success(`Image Deleted Successfully `);
        setTimeout(() => window.location.reload(), 1500);
      });
  }
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {images?.length > 0 &&
        images.map((file, index) => (
          <li key={index} id={index} className="relative">
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <img
                src={file}
                alt=""
                className="object-cover pointer-events-none group-hover:opacity-75"
              />
            </div>
            <div className="flex mt-4 justify-center">
              <button
                type="submit"
                onClick={() => handleDelete(index)}
                className="bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}
