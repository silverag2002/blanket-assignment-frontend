import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "../base/hooks/useAuth";

const Loginpage = () => {
  const { handleSubmit, register } = useForm({});
  const { login } = useAuth();

  const onSubmit = (data) => {
    console.log("Data in login form", data);
    login({
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        console.log("response from authenticaation", response);
        toast.success("Login successful !!");
      })
      .catch((error) => {
        console.log("Errro", error);

        if (error.response.status == 401) {
          toast.error(`Please check the credentails you have provided.`);
        } else {
          toast.error(`Something went wrong please try again later!`);
        }
      });
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div>
        <Toaster />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="email"
                  required
                  {...register("email")}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
            </div>

            <div className="flex items-center justify-left">
              <div className="text-sm">
                <span>Don't have an account ?</span>
                <span>
                  {" "}
                  <a
                    href="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign Up
                  </a>
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
