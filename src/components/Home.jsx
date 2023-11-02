import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home-page">
      <div className="home-page-container">
        <h1 className="home-page-greet">Hello there!</h1>
        <Link to="/login">Log in</Link>
        <p>You don't have an account?</p>
        <Link to="/register">Sign up</Link>
      </div>
    </main>
  );
};

export default Home;
