import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Spinner } from "./skeleton/spinner";
import { BottomGradient } from "./signup";
import { Input } from "../ui/input";
import { Spotlight } from "../ui/spotLight";
import { BACKEND_URL } from "../../config.js";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const auth = async () => {
    setEmailError("");
    setPasswordError("");
    setError("");

    const newEmailError = !email.trim() ? "Please enter your email" : "";
    const newPasswordError = !password.trim() ? "Please enter your password" : "";

    setEmailError(newEmailError);
    setPasswordError(newPasswordError);

    if (newEmailError || newPasswordError) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin");
      } else {
        setError("Login failed: Invalid response from server");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center bg-gradient-to-r from-zinc-900 to-zinc-950 overflow-hidden relative">
      <Spotlight
        className="-top-[90px] left-0 md:-top-3 md:left-44 md:h-[1000px] lg:h-[1400px]"
        fill="white"
      />
      <div className="lg:w-[400px] w-[360px] bg-zinc-950 border absolute mt-52 rounded-lg border-zinc-600">
        <p className="text-white text-center font-bold tracking-wide mt-2 text-xl">
          Join DocPlatter
        </p>
        <div className="text-white text-center font-bold mt-2">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-600 transition-all duration-200"
          >
            Signup
          </button>
        </div>
        <div className="p-6 ml-2 tracking-wider">
          <div className="text-white mt-4 font-medium">
            Email Address
            <Input
              type="text"
              placeholder="docplatter@fc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div className="text-white mt-4 font-medium">
            Password
            <Input
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

          <button
            onClick={auth}
            disabled={loading}
            type="button"
            className="group/btn relative mt-5 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] border border-t-gray-700 border-b-gray-700 border-r-0 border-l-0 cursor-pointer"
          >
            Log in →
            <BottomGradient />
          </button>
          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </div>
      </div>
    </div>
  );
};