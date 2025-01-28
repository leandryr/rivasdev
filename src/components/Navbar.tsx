import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imag/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Acerca", path: "/acerca" },
    { name: "Servicios", path: "/servicios" },
    { name: "Portafolio", path: "/portafolio" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo de RivasDev" className="logo" />
      </div>

      {/* Buscador Centrado */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          className="search-input"
        />
        <button className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1117.1 3.9a7.5 7.5 0 01-.45 13.25z"
            />
          </svg>
        </button>
      </div>

      {/* Menú de Navegación */}
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* Menú móvil */}
      <button
        className={`menu-button ${isOpen ? "menu-button-active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      {isOpen && (
        <div className="mobile-menu">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="mobile-menu-link"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
