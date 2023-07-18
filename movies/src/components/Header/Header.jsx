import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import  "./Header.css"

const Header = () => {

  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header>
      <nav className="div-nav">
        <Link to="/">
          <button>Página de inicio</button>
        </Link>
        <div className="container">
          {isAuthenticated ? (
            <>
              <div className="div-welcome">Bienvenid@ {user.username}!</div>

              <button>
                <Link
                  to="/add-movie"
                  className="bg-indigo-500 px-4 py-1 rounded-sm"
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
                <Link
                  to="/login"
                
                >
                  Login
                </Link>
              </button>

              <button>
                <Link
                  to="/register"
                 
                >
                  Registrarse
                </Link>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}



export default Header
