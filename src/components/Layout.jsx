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
  X,
  Menu,
} from "feather-icons-react";
import { useState } from "react";

const Layout = () => {
  const [navbarPosition, setNavbarPosition] = useState("-300px");
  const [navButtonHidden, setNavButtonHidden] = useState("");
  const { auth } = useAuth();

  const toggleNavbar = () => {
    setNavbarPosition(navbarPosition === "-300px" ? "300px" : "-300px");
    setNavButtonHidden(navButtonHidden === "hidden" ? "" : "hidden");
  };

  return (
    <div className="space-x-0 flex justify-start min-h-full min-w-full max-h-full max-w-full">
      <div
        className={`bg-slate-900 fixed top-0 sm:left-0 px-4 py-4 flex-col flex justify-between sm:items-center w-[300px] sm:min-w-48 sm:max-w-48 min-h-full text-slate-100 left-[${navbarPosition}]`}
      >
        {auth.currentUserId ? (
          <div>
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="flex justify-between w-full pr-4 items-baseline lg:justify-start">
                <NavLink
                  to="/"
                  className="flex justify-start gap-2 hover:bg-slate-600 hover:text-slate-50 p-2 rounded transition-colors
            min-w-40 hover:cursor-pointer"
                >
                  <Grid />
                  <div>Home</div>
                </NavLink>
                <X
                  className="sm:hidden flex justify-start gap-2 rounded transition-colors hover:cursor-pointer"
                  onClick={toggleNavbar}
                />
              </div>
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
            <Menu
              className={`bg-slate-900 fixed top-4 left-4 p-2 w-10 h-10 rounded flex-col flex justify-between items-center ${navButtonHidden} sm:hidden text-white`}
              onClick={toggleNavbar}
            />
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
