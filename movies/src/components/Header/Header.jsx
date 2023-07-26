import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import "./Header.css";
import Nav from "../Nav/Nav";
import logo from "../../images/logo_uf.png";

const Header = () => {
  const { isAuthenticated, logout, userName } = useAuth();
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="container-home">
          <Link to="/" title="Home">
            <i className="fa-solid fa-house"></i>
          </Link>
        </div>

        <div className="input-container">
          <Nav />
        </div>

        <div className="container-icons">
          {isAuthenticated ? (
            <>
              <div className="div-welcome">Welcome {userName.username}!</div>

              

              <Link to="/admin">
                {" "}
                {parseInt(userName.role) === 32 ? (
                  <img
                    className="admin-login"
                    src=" https://i.postimg.cc/xdNhVNmy/shield.png"
                    alt="adminIMG"
                  />
                ) : (
                  ""
                )}{" "}
              </Link>

              <Link to="/profile" className="icon-link" title="Profile">
                <i class="fa-solid fa-user"></i>
              </Link>

              <button
                className="icon-link"
                onClick={() => {
                  logout();
                  navigate("/");
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
