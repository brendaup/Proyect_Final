import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout, userName } = useAuth();

  console.log("este es mi nombre", userName);

  return (
/*     <header>
      <nav className="div-nav">
        <button>
          <Link to="/">Inicio</Link>
        </button>

        <div className="container">
          {isAuthenticated ? (
            <>
              <div className="div-welcome">Bienvenid@ {userName}!</div>

              <button>
                <Link to="/add-movie">Añadir pelicula</Link>
              </button>
              <button>
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Link>
              </button>
            </>
          ) : (
            <>
              <button>
                <Link to="/login">Login</Link>
              </button>

              <button>
                <Link to="/register">Registrarse</Link>
              </button>
            </>
          )}
        </div>
      </nav>
    </header> */
    <header>
      <nav className="div-nav">
        <Link to="/">
          <h1 className="logo">Movie App</h1>
        </Link>

        <div className="container">
          {isAuthenticated ? (
            <>
              <div className="div-welcome">Bienvenid@ {userName}!</div>

              <Link to="/add-movie" className="icon-link">
                <i className="fas fa-plus"></i> Añadir película
              </Link>
              <button
                className="icon-link"
                onClick={() => {
                  logout();
                }}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="icon-link">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>

              <Link to="/register" className="icon-link">
                <i className="fas fa-user-plus"></i> Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
