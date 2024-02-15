import { Link, NavLink, Outlet } from "react-router-dom";
import Logout from "./Logout";
import useAuth from "../hooks/useAuth";
import {
  Grid,
  Users,
  List,
  Settings,
  LogIn,
  LogOut,
} from "feather-icons-react";

const Layout = () => {
  const { auth } = useAuth();
  return (
    <div className="space-x-0 flex justify-start min-h-full min-w-full max-h-full max-w-full">
      <div className="bg-slate-900 px-4 py-4 flex-col flex justify-between items-center min-w-48 text-slate-100">
        {auth.currentUserId ? (
          <div className="flex flex-col justify-start items-start gap-4">
            <NavLink
              to="/"
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <Grid />
              <div>Home</div>
            </NavLink>
            <NavLink
              to="/dashboard"
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <Users />
              <div>Teams</div>
            </NavLink>
            <NavLink
              to="/chores"
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <List />
              <div>Chores</div>
            </NavLink>
            {/* <NavLink
              to="/"
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <Settings />
              <div>Settings</div>
            </NavLink> */}
          </div>
        ) : (
          <div className="flex flex-col justify-start items-start gap-4">
            <NavLink
              to="/"
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <Grid />
              <div>Dashboard</div>
            </NavLink>
          </div>
        )}

        <div className="flex flex-col justify-start items-start gap-4">
          {auth.currentUserId ? (
            <Logout
              styleClasses="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            />
          ) : (
            <Link
              to="/login"
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <LogIn />
              <div>Login</div>
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
