import { useUser } from "../base/hooks/useUser";
import Sidebar from "../components/Sidebar";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../base/api/axios.util";
import { URLConstants } from "../base/api/url.constants";

export default function Account() {
  const { user, setUser } = useUser();

  const {
    handleSubmit,
    register,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
    },
  });
  const navigate = useNavigate();

  console.log("User", user);

  const onSubmit = (data) => {
    console.log("IS dity", dirtyFields);
    const modifiedData = Object.keys(data).reduce((acc, key) => {
      if (dirtyFields.hasOwnProperty(key)) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    console.log("Data in login form", modifiedData);

    axiosInstance
      .put(URLConstants.user(user?._id), modifiedData)
      .then((res) => {
        console.log("Resposne", res);
        if (res?.data?.user) {
          setUser(res.data.user);
        }
        toast.success(`Profile updated successfully`);
        navigate("/images");
      })
      .catch((err) => {
        console.log("Err", err);

        if (err.response.status == 401) {
          console.log("Triggered");
          toast.error(`Please Login again!`);
          setTimeout(() => navigate("/"), 1500);
        } else {
          toast.error(`Something went wrong please try again later!`);
        }
      });
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5 mx-4 my-4">
        <Sidebar active={0} />
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Account
                  </h3>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      type="text"
                      {...register("firstName")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      type="text"
                      {...register("lastName")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      type="password"
                      {...register("password")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      type="text"
                      {...register("address")}
                    />
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
        </div>
      </div>
    </>
  );
}
