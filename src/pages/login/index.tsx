/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authStore } from "../../store/auth";
import { getProfile } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillDiscord } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io5";
import ThemeToggle from "../../components/themeToggle/themeToggle";

export default function App() {
  const [user, setUser] = useState<any>([]);
  const { login } = authStore();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse: any) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(user.access_token);
        login(data.data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      // fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex flex-row h-screen p-4 gap-6 items-center justify-center bg-primary-bg">
      {/* left side*/}
      <div className="hidden md:block w-full h-full bg-accent-bg rounded-3xl p-6 lg:p-12">
        <div className="flex flex-col h-full rounded-3xl p-6 lg:p-12 gap-6 items-start justify-start bg-[#4b58d7] relative">
          <div className="p-4 rounded-full bg-white flex flex-row items-center justify-between gap-6">
            {/* todo change to svg*/}
            <img src="/icon.png" />
            <h2 className="text-2xl font-bold text-black">Base</h2>
          </div>
          <div className="flex flex-col gap-6 items-start justify-start">
            <h2 className="text-5xl font-bold text-white max-w-[500px] leading-[63px]">
              Generate detailed reports with just one click
            </h2>
          </div>
          <img
            src="/auth/img.png"
            className=" absolute right-0 bottom-0 max-w-[70%] max-h-[350px]"
          />
          <div className="absolute bottom-0 left-0">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* right side*/}
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="md:hidden absolute top-0 flex flex-row items-center gap-4 h-20 p-4 bg-[#605bff] w-full">
          <img src="/iconWhite.svg" />
          <h2 className="text-2xl text-primary-text">Base</h2>
        </div>
        <div className="max-w-[450px] w-full text-primary-text h-full max-h-[600px] flex flex-col gap-6 justify-start">
          <h1 className="text-4xl font-bold">Sign In</h1>
          <p className="font-bold">Sign in to your account</p>
          <div className="w-full flex-row flex gap-4 items-center justify-between">
            <button
              className="w-full p-2 rounded-xl bg-secondary-bg text-secondary-text font-bold flex items-center justify-center gap-4"
              onClick={() => googleLogin()}
            >
              <img src="./auth/googleIcon.svg" className="w-6 h-6" />
              <p>Sign in with Google</p>
            </button>
            <button className="w-full p-2 rounded-xl bg-secondary-bg text-secondary-text font-bold flex items-center justify-center gap-4">
              <img src="./auth/appleIcon.svg" className="w-6 h-6" />
              <p>Sign in with apple</p>
            </button>
          </div>

          <form className="bg-secondary-bg  rounded-xl w-full p-8 flex flex-col items-center justify-center gap-6">
            <div className="w-full">
              <label className="font-bold w-full">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 my-2 rounded-xl bg-primary-bg  font-bold"
              />
            </div>

            <div className="w-full">
              <label className=" font-bold w-full">Password</label>
              <input
                type="password"
                placeholder="password"
                className="w-full p-2 my-2 rounded-xl bg-primary-bg font-bold"
              />
            </div>
            <a href="/forgotpassword" className="w-full text-[#4979D9]">
              Forgot Password?
            </a>
            <button
              type="submit"
              className="w-full p-2 my-2 rounded-xl bg-[#605bff] font-bold"
            >
              Sign in
            </button>
          </form>
          <div className="flex flex-row gap-2 items-center justify-center">
            <p className="text-[#858585]">Don't have an account?</p>
            <a href="/signup" className="text-[#605bff]">
              Register here
            </a>
          </div>

          <div className="flex flex-row h-full gap-4 items-end justify-center ">
            <FaGithub className="text-[#858585] text-2xl" />
            <AiFillTwitterCircle className="text-[#858585] text-2xl" />
            <IoLogoLinkedin className="text-[#858585] text-2xl" />
            <AiFillDiscord className="text-[#858585] text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
