import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import "./Header.css";
import Nav from "../Nav/Nav";

const Header = () => {
  const { isAuthenticated, logout, userName } = useAuth();

  console.log("este es mi nombre", userName);

  return (

    <header>
      <div className="header-container">
        {/* Bloque del logo */}
        <div className="container-home">
          <Link to="/" title="Home">
            <i className="fa-solid fa-house"></i>
          </Link>
        </div>

        {/* Bloque del input */}
        <div className="input-container">
          <Nav/>
        </div>

        {/* Bloque de los iconos */}
        <div className="container-icons">
          {isAuthenticated ? (
            <>
              <div className="div-welcome">Bienvenid@ {userName}!</div>

              <Link to="/add-movie" className="icon-link" title="Add">
                <i className="fas fa-plus"></i> 
              </Link>
              <button
                className="icon-link"
                onClick={() => {
                  logout();
                }}
              >
                <i className="fas fa-sign-out-alt" title="Log out"></i> 
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="icon-link" title="Login">
                <i className="fas fa-sign-in-alt"></i> 
              </Link>

              <Link to="/register" className="icon-link" title="Register">
                <i className="fas fa-user-plus"></i> 
              </Link>
            </>
          )}
        </div>
      </div>

    </header>


   
  );
};

export default Header;
