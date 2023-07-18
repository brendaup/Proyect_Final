import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  console.log(user);

  return (
    <header>
      <nav className="div-nav">


        <button>
          <Link to="/">Inicio</Link>
        </button>

        <div className="container">
          {isAuthenticated ? (
            <>
              <div className="div-welcome">Bienvenid@ {user.email}!</div>

              <button>
                <Link
                  to="/add-movie"
                >
                  Añadir pelicula
                </Link>
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
    </header>
  );
};

export default Header;
