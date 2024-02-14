import ImageGrid from "../components/ImagesGrid";
import Sidebar from "../components/Sidebar";
import { useUser } from "../base/hooks/useUser";
import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";
import axios from "axios";
import { AuthTokenHandler } from "../base/api/auth-token.util";

export default function FileUpload() {
  const [images, setImages] = useState([]);
  const { handleSubmit, register } = useForm({});
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Data", data);
    var formData = new FormData();
    if (data?.imgGallery[0]?.size) {
      for (let i = 0; i < data.imgGallery.length; i++) {
        formData.append("images", data.imgGallery[i]);
      }
      const accessToken = AuthTokenHandler.getAccessToken();
      var config = {
        method: "POST",
        url: URLConstants.fileUpload(user?._id),
        headers: {
          headers: { "content-type": "multipart/form-data" },
          Authorization: `Bearer ${accessToken} `,
        },
        data: formData,
      };
      // .post(URLConstants.fileUpload(user?._id), { data: formData })
      axios(config)
        .then((res) => {
          console.log("Response after submitting form", res);

          toast.success(`Images uploaded successfully`);
          setTimeout(() => navigate("/images"), 1500);
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
    } else {
      toast.error("Please uplaod an image");
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5 mx-4 my-4">
        <Sidebar active={1} />
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Image Upload
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Add Image
                    </label>

                    <div class="flex items-center justify-center w-full mt-4">
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-indigo-800 dark:bg-indigo-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                      >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          multiple
                          class="hidden"
                          {...register("imgGallery", {
                            onChange: (e) => {
                              let arr = [];
                              for (let i = 0; i < e.target.files.length; i++) {
                                arr.push(
                                  URL.createObjectURL(e.target.files[i])
                                );
                              }
                              setImages(arr);
                            },
                          })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          <div>
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {images?.length > 0 &&
                images.map((file, index) => (
                  <li key={index} className="relative">
                    <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                      <img
                        src={file}
                        alt=""
                        className="object-cover pointer-events-none group-hover:opacity-75"
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
