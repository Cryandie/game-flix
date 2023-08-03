import {
  NavLink,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./Header.css";
import Contact from "../Main/Contact";
import Main from "../Main";

function Header() {
  const location = useLocation();
  return (
    <div>
      <nav className="header-container">
        <NavLink
          to="/video-games"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <h2 className="nav-item ">VIDEO GAMES</h2>
          <div className="reflection">VIDEO</div>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <h2 className="nav-item ">CONTACT</h2>
          <div className="reflection">CONTACT</div>
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/video-games" />} />
        <Route
          path="/video-games"
          element={location.pathname !== "/contact" && <Main />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default Header;
