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
            <div
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <Grid />
              <NavLink to="/">Dashboard</NavLink>
            </div>
            <div
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <Users />
              <NavLink to="/dashboard">Teams</NavLink>
            </div>
            <div
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <List />
              <NavLink to="/chores">Chores</NavLink>
            </div>
            <div
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <Settings />
              <NavLink to="/">Settings</NavLink>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-start items-start gap-4">
            <div
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <Grid />
              <NavLink to="/">Dashboard</NavLink>
            </div>
          </div>
        )}

        <div className="flex flex-col justify-start items-start gap-4">
          {auth.currentUserId ? (
            <div
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <LogOut />
              <Logout />
            </div>
          ) : (
            <div
              className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
            >
              <LogIn />
              <Link to="/login">Login</Link>
            </div>
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
