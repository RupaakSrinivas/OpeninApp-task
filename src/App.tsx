import { Outlet } from 'react-router-dom';
import Sidebar from "./components/Sidebar";

export default function App() {

  return (
    <div className="flex flex-row h-screen w-full items-center justify-center">
      <div className="hidden md:block h-full max-w-[400px]">
          <Sidebar />
      </div>
      <div className="flex flex-col w-full">
          <Outlet />
      </div>
    </div>
  );
}
