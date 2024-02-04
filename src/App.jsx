import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";
import TeamDetails from "./components/teams/TeamDetails";
import CreateTeam from "./components/teams/CreateTeam";
import UpdateTeam from "./components/teams/UpdateTeam";
import CreateChore from "./components/chores/CreateChore";
import ChoresList from "./components/chores/ChoresList";
import ChoreDetails from "./components/chores/ChoreDetails";
import UpdateChore from "./components/chores/UpdateChore";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        {/* not protected routes */}
        <Route path="/" element={<Home />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teams/:teamId" element={<TeamDetails />} />
          <Route path="/teams/new" element={<CreateTeam />} />
          <Route path="/teams/:teamId/edit" element={<UpdateTeam />} />
          <Route path="/chores" element={<ChoresList />} />
          <Route path="/teams/:teamId/chores/new" element={<CreateChore />} />
          <Route
            path="/teams/:teamId/chores/:choreId"
            element={<ChoreDetails />}
          />
          <Route
            path="/teams/:teamId/chores/:choreId/edit"
            element={<UpdateChore />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
