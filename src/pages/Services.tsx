import { FaCode, FaMobileAlt, FaCloud, FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Services.module.css";

const Services = () => (
  <section className={styles.servicesSection}>
    {/* Encabezado */}
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Nuestros Servicios</h1>
        <p className={styles.heroText}>
          En <span>RivasDev</span>, ofrecemos una gama completa de servicios tecnológicos diseñados para 
          transformar tus ideas en realidades digitales. Cada proyecto se aborda con precisión y pasión para garantizar resultados excepcionales.
        </p>
      </div>
    </div>

    {/* Grid de Servicios */}
    <div className={styles.servicesGrid}>
      <div className={styles.serviceCard}>
        <div className={styles.iconContainer}>
          <FaCode className={styles.serviceIcon} />
        </div>
        <h3 className={styles.serviceTitle}>Desarrollo Web</h3>
        <p className={styles.serviceDescription}>
          Sitios dinámicos y escalables, adaptados a tus necesidades y optimizados para cualquier dispositivo.
        </p>
      </div>

      <div className={styles.serviceCard}>
        <div className={styles.iconContainer}>
          <FaMobileAlt className={styles.serviceIcon} />
        </div>
        <h3 className={styles.serviceTitle}>Aplicaciones Móviles</h3>
        <p className={styles.serviceDescription}>
          Desarrollamos aplicaciones intuitivas y atractivas para iOS y Android que potencian tu alcance digital.
        </p>
      </div>

      <div className={styles.serviceCard}>
        <div className={styles.iconContainer}>
          <FaCloud className={styles.serviceIcon} />
        </div>
        <h3 className={styles.serviceTitle}>Soluciones en la Nube</h3>
        <p className={styles.serviceDescription}>
          Servicios confiables en la nube para optimizar tus procesos y garantizar una experiencia fluida.
        </p>
      </div>

      <div className={styles.serviceCard}>
        <div className={styles.iconContainer}>
          <FaDatabase className={styles.serviceIcon} />
        </div>
        <h3 className={styles.serviceTitle}>Gestión de Datos</h3>
        <p className={styles.serviceDescription}>
          Soluciones seguras y escalables para manejar, almacenar y analizar datos clave de tu negocio.
        </p>
      </div>
    </div>

    {/* CTA */}
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>¿Estás listo para transformar tu negocio con tecnología?</h2>
        <Link to="/contacto" className={styles.ctaButton}>
          Contáctanos Hoy
        </Link>
      </div>
    </div>
  </section>
);

export default Services;