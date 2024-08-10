import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { authStore } from "../store/auth";
import LoadingScreen from "./loadingScreen";

export default function GuardedRoute() {
  const navigation = useNavigation();
    const { name } = authStore();

  if (name != "") {
    return navigation.state === "loading" ? <LoadingScreen /> : <Outlet />;
  } 
  else {
    return <Navigate to="/login" />;
  }
}
