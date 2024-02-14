import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { axiosInstance } from "../api/axios.util";
import { URLConstants } from "../api/url.constants";
import { AuthTokenHandler } from "../api/auth-token.util";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuth = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(undefined);

    localStorage.removeItem("jwtToken");
    console.log("Logged out");
  };

  const login = (loginData) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(URLConstants.login(), loginData)
        .then((response) => {
          try {
            console.log(" Client Login Successful", response);
            console.log(" Client Login Successful ^^^^^^", response.data.user);
            // const data = response;
            const user = response?.data.user;

            AuthTokenHandler.setAccessToken(response?.data.token);

            localStorage.setItem("jwtToken", response?.data.token);
            setUser(user);
            navigate("/images");
          } catch (error) {
            console.error(error);
          }
          resolve({ user });
        })
        .catch((err) => {
          console.log("Err", err);
          reject(err);
        });
    });
  };

  return {
    logout,
    login,
  };
};
