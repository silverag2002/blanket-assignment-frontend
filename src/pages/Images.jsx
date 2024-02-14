import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import { useUser } from "../base/hooks/useUser";
import ImageGrid from "../components/ImagesGrid";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Images() {
  const [images, setImages] = useState([]);
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(URLConstants.user(user?._id))
      .then((res) => {
        console.log("Resposne ", res);
        setImages(res.data?.imgUrls);
        if (res?.data?.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log("Err", err);

        if (err.response?.status == 401) {
          console.log("Triggered");
          toast.error(`Please Login again!`);
          setTimeout(() => navigate("/"), 1500);
        } else {
          toast.error(`Something went wrong please try again later!`);
        }
      });
  }, []);
  console.log("IMages", images);
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5 mx-4 my-4">
        <Sidebar active={0} />
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Uploaded Images
            </h3>
          </div>

          {images.length == 0 && (
            <div className=" flex flex-col items-center justify-center">
              <h1 className="text-2xl ">No Images uploaded</h1>
              <a
                href="/upload-image"
                className="bg-indigo-600 mt-6 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Click here to Upload
              </a>
            </div>
          )}
          {images.length > 0 && <ImageGrid images={images} />}
        </div>
      </div>
    </>
  );
}
