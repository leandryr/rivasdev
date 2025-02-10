import { FaCode, FaMobileAlt, FaPaintBrush, FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Portfolio.module.css";
import reservasImg from "../assets/images/reservas.png";



// Definir los tipos de datos
interface Project {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface Work {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

// Definir los datos de los proyectos
const projects: Project[] = [
  { id: 1, title: "Desarrollo Web", description: "Sitios web modernos y responsivos.", icon: <FaCode /> },
  { id: 2, title: "Apps Móviles", description: "Aplicaciones iOS y Android personalizadas.", icon: <FaMobileAlt /> },
  { id: 3, title: "Diseño UI/UX", description: "Experiencias visuales atractivas.", icon: <FaPaintBrush /> },
  { id: 4, title: "Automatización", description: "Soluciones automatizadas y eficientes.", icon: <FaCogs /> }
];

// Definir los datos de los trabajos destacados
const works: Work[] = [
  {    id: 1,
    title: "Sistema de Registro para Campamento - Solución Profesional",
    description: "Este sistema ofrece una solución integral para la gestión de eventos, reduciendo esfuerzos manuales y mejorando la organización.",
    image:  reservasImg,
    link: "/portfolio/reservas"
   
  },
  {
      id: 2,
    title: "E-commerce Avanzado",
    description: "Tienda online con pasarelas de pago integradas.",
    image: "/images/ecommerce.jpg",
    link: "/portfolio/ecommerce"
  },
  {
    id: 3,
    title: "Red Social Innovadora",
    description: "Plataforma interactiva con chat en tiempo real.",
    image: "/images/red-social.jpg",
    link: "/portfolio/red-social"
  }
];

const Portfolio = () => {
  return (
    <section className={styles.portfolioSection}>
      {/* Encabezado */}
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Nuestro Portfolio</h1>
          <p className={styles.heroText}>
            En <span>RivasDev</span>, hemos transformado ideas en realidades digitales excepcionales.
            Aquí encontrarás una selección de nuestros proyectos más destacados que combinan tecnología, creatividad y resultados impactantes.
          </p>
        </div>
      </div>

      {/* Sección de Proyectos */}
      <div className={styles.projectsContainer}>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.iconWrapper}>{project.icon}</div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Trabajos Destacados */}
      <div className={styles.worksContainer}>
        <h2 className={styles.sectionTitle}>Trabajos Destacados</h2>
        <div className={styles.worksGrid}>
          {works.map((work) => (
            <article key={work.id} className={styles.workCard}>
              <div className={styles.imageContainer}>
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className={styles.workImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <div className={styles.workContent}>
                <h3 className={styles.workTitle}>{work.title}</h3>
                <p className={styles.workDescription}>{work.description}</p>
                <Link to={work.link} className={styles.workLink}>
                  Ver Proyecto
                  <span className={styles.linkArrow}>&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
