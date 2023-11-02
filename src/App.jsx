import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";
import TeamDetails from "./components/TeamDetails";
import CreateTeam from "./components/CreateTeam";
import UpdateTeam from "./components/UpdateTeam";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* not protected routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teams/:teamId" element={<TeamDetails />} />
          <Route path="/teams/new" element={<CreateTeam />} />
          <Route path="/teams/:teamId/edit" element={<UpdateTeam />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
