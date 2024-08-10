/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authStore } from "../../store/auth";
import { getProfile } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

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
      fetchProfile();
    }
  }, [user, login, navigate]);

  // log out function to log the user out of google and set the profile array to null

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <button
        className="bg-white text-black font-semibold px-4 p-2 rounded-md"
        onClick={() => googleLogin()}
      >
        Sign in with Google 🚀{" "}
      </button>
    </div>
  );
}
