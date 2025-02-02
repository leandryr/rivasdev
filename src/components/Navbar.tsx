import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaBars, FaSearch } from "react-icons/fa";
import logo from "../assets/imag/1.webp";
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      navigate(`/search?query=${query}`);
      setIsMenuOpen(false);
    }
  };

  const clearSearch = () => setQuery("");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Control del scroll para ocultar/mostrar navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll hacia abajo
        setNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba
        setNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle para mejorar rendimiento
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll);
    
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [lastScrollY]);

  // Throttle function
  const throttle = (func: () => void, limit: number) => {
    let inThrottle: boolean;
    return () => {
      if (!inThrottle) {
        func();
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  return (
    <nav className={`${styles.navContainer} ${navbarVisible ? styles.visible : styles.hidden}`}>
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
          
          {/* Botón de cerrar menú */}
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
                <FaSearch className={styles.searchIcon} />
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  <span className={styles.menuLinkUnderline}></span>
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