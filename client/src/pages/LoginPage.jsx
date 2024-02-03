import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["UserToken"]);

  const navigate = useNavigate();

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setCookie("UserToken", data.token, { expires: expirationDate });
      window.localStorage.setItem("logged", true);
      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-32">
          <h1 className="text-xl text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <span className="text-red-400 text-sm"></span>

            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary">Login</button>
            <div className="text-gray-500">
              Don't have an account yet?
              <Link to={"/register"} className="underline text-black">
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
