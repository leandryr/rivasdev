import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import logo from "../assets/imag/logo.svg";
import styles from "./Navbar.module.css";

type MenuItem = {
  name: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { name: "Inicio", path: "/" },
  { name: "Acerca", path: "/acerca" },
  { name: "Servicios", path: "/servicios" },
  { name: "Portafolio", path: "/portafolio" },
  { name: "Contacto", path: "/contacto" },
];

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      navigate(`/search?query=${query}`);
    }
  };

  const clearSearch = () => setQuery("");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navWrapper}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
        </div>

        {/* Menú Hamburguesa */}
        <button 
          className={styles.menuButton} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>

        {/* Contenido del Navbar */}
        <div className={`${styles.navContent} ${isMenuOpen ? styles.menuOpen : ""}`}>
          {/* Botón de Cerrar en móvil */}
          <button 
            className={styles.closeButton} 
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          {/* Buscador */}
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {query && (
                  <FaTimes 
                    onClick={clearSearch} 
                    className={styles.clearIcon}
                    aria-label="Clear search"
                  />
                )}
              </div>
              <button type="submit" className={styles.searchButton}>
                Buscar
              </button>
            </form>
          </div>

          {/* Menú */}
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.name} className={styles.menuItem}>
                <Link 
                  to={item.path} 
                  className={styles.menuLink}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;