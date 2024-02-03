import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/register", {
      name,
      email,
      password,
    });
  };
  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-32">
          <h1 className="text-xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary">Sign Up</button>
            <div className="text-gray-500 flex gap-1 mt-1">
              <p>Have an account Already?</p>
              <Link to={"/login"} className="underline text-black">
                Login now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
