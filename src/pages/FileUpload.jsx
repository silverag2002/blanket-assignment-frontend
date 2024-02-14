import ImageGrid from "../components/ImagesGrid";
import Sidebar from "../components/Sidebar";
import { useUser } from "../base/hooks/useUser";
import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";

export default function FileUpload() {
  const [images, setImages] = useState([]);
  const { handleSubmit, register } = useForm({});

  const onSubmit = (data) => {};

  return (
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
                    Cover photo
                  </label>
                  <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            placeholder="Image URL"
                            multiple
                            {...register("gallery", {
                              onChange: (e) => {
                                let arr = [];
                                for (
                                  let i = 0;
                                  i < e.target.files.length;
                                  i++
                                ) {
                                  arr.push(
                                    URL.createObjectURL(e.target.files[i])
                                  );
                                }
                                setImages(arr);
                              },
                            })}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                    </div>
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
          <ImageGrid images={images} />
        </div>
      </div>
    </div>
  );
}
