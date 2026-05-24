import { NavLink } from "react-router-dom"
import "./NavBar.css"

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">⚡ Superpower Shop</div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/superpowers" className={({ isActive }) => isActive ? "active" : ""}>Shop</NavLink>
        <NavLink to="/superpowers/new" className={({ isActive }) => isActive ? "active" : ""}>Add Power</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
      </div>
    </nav>
  )
}

export default NavBar