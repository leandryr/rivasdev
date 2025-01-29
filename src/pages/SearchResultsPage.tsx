import { useLocation } from "react-router-dom";

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

  const results = menuItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Resultados de búsqueda</h1>
      <p>Mostrando resultados para: "{query}"</p>
      {results.length > 0 ? (
        <ul>
          {results.map((item) => (
            <li key={item.name}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados para tu búsqueda.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
