import { googleLogout } from "@react-oauth/google";
import { authStore } from "./store/auth";

export default function App() {

  const { getUser, logout } = authStore();
  const profile = getUser();

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    logout();
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />

      <div>
        <img src={profile.picture} alt="user image" />
        <h3>User Logged in</h3>
        <p>Name: {profile.name}</p>
        <p>Email Address: {profile.email}</p>
        <br />
        <br />
        <button onClick={logOut}>Log out</button>
      </div>
    </div>
  );
}
