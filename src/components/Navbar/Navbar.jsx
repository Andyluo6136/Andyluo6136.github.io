import { NavLink } from 'react-router-dom'; // 1. Import NavLink
import './Navbar.css'; 

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <nav>
          <ul className="navbar-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
