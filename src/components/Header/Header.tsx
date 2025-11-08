import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">💫 Oscars Death Race 💫</h1>
      <nav>
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/dashboard">Dashboard</Link>
        <Link className="link" to="/register">Cadastro</Link>
      </nav>
    </header>
  );
};

};
