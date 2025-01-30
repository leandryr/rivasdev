import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSearch, FaRegSadTear } from "react-icons/fa";
import styles from "./SearchResultsPage.module.css";

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

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  
  const results = menuItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <FaSearch className={styles.searchIcon} />
          Resultados de búsqueda
        </h1>
        
        <div className={styles.searchMeta}>
          <p className={styles.queryText}>
            Mostrando resultados para: <span>"{query}"</span>
          </p>
          <p className={styles.resultsCount}>
            {results.length} resultado{results.length !== 1 && 's'} encontrado{results.length !== 1 && 's'}
          </p>
        </div>
      </div>

      {results.length > 0 ? (
        <ul className={styles.resultsList}>
          {results.map((item) => (
            <li key={item.name} className={styles.resultItem}>
              <Link to={item.path} className={styles.resultLink}>
                <span className={styles.resultName}>{item.name}</span>
                <span className={styles.resultPath}>{item.path}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>
          <FaRegSadTear className={styles.noResultsIcon} />
          <p className={styles.noResultsText}>
            No encontramos resultados para tu búsqueda.
            <br />
            Intenta con diferentes términos o palabras clave.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;