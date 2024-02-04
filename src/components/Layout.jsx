import { Link, NavLink, Outlet } from "react-router-dom";
import Logout from "./Logout";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { auth } = useAuth();
  return (
    <div className="space-x-0 flex justify-start min-h-full min-w-full max-h-full max-w-full">
      <div className="bg-slate-900 px-4 py-4 flex-col flex justify-between items-center min-w-48 text-slate-100">
        <div className="flex flex-col justify-start items-start gap-4">
          <NavLink
            to="/"
            className="hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard"
            className="hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40"
          >
            Teams
          </NavLink>
          <NavLink
            to="/chores"
            className="hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40"
          >
            Chores
          </NavLink>
          <NavLink
            to="/"
            className="hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40"
          >
            Settings
          </NavLink>
        </div>
        <div className="flex flex-col justify-start items-start gap-4">
          {auth.currentUserId ? (
            <Logout
              styleClasses="hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40"
            />
          ) : (
            <Link
              to="/login"
              className="hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <main className="flex justify-center items-start p-10 bg-slate-800 text-slate-50 flex-auto overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
