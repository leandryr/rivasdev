import HeroHeader from "../components/HeroHeader";
import ReviewForm from "../components/ReviewForm";
import QuotationForm from "../components/QuotationForm";
import styles from "./Home.module.css";
import { FiMonitor, FiLayout, FiSettings } from "react-icons/fi";

const Home = () => {
  return (
    <div className={styles.container}>
      <HeroHeader />

      {/* Sección de Servicios */}
      <section className={styles.servicesSection}>
        <div className={styles.servicesGrid}>
          {/* Desarrollo Web */}
          <div className={styles.serviceCard}>
            <FiMonitor className={styles.serviceIcon} />
            <h2 className={styles.serviceTitle}>Desarrollo Web</h2>
            <p className={styles.serviceDescription}>
              Ofrecemos soluciones personalizadas para la creación de sitios web, optimizados y adaptativos para cualquier dispositivo.
            </p>
            <ul className={styles.serviceList}>
              <li>Diseño Responsive</li>
              <li>Optimización SEO</li>
              <li>Integración con APIs</li>
            </ul>
          </div>

          {/* Plantillas Web */}
          <div className={styles.serviceCard}>
            <FiLayout className={styles.serviceIcon} />
            <h2 className={styles.serviceTitle}>Plantillas Web</h2>
            <p className={styles.serviceDescription}>
              Explora nuestras plantillas profesionales para darle un toque único a tu sitio web con diseños modernos y funcionales.
            </p>
            <ul className={styles.serviceList}>
              <li>Diseños Personalizables</li>
              <li>Compatibilidad Multiplataforma</li>
              <li>Soporte Técnico Incluido</li>
            </ul>
          </div>

          {/* Mantenimiento Web */}
          <div className={styles.serviceCard}>
            <FiSettings className={styles.serviceIcon} />
            <h2 className={styles.serviceTitle}>Mantenimiento Web</h2>
            <p className={styles.serviceDescription}>
              Asegúrate de que tu sitio web esté siempre actualizado y funcionando de manera óptima con nuestros servicios de mantenimiento.
            </p>
            <ul className={styles.serviceList}>
              <li>Actualizaciones Regulares</li>
              <li>Resolución de Problemas</li>
              <li>Monitoreo Continuo</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sección de Cotización */}
      <section className={`${styles.sectionContainer} ${styles.quotationSection}`}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}></h2>
          <QuotationForm />
        </div>
      </section>

      {/* Sección de Reseñas */}
      <section className={`${styles.sectionContainer} ${styles.reviewsSection}`}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}></h2>
          <ReviewForm />
        </div>
      </section>
    </div>
  );
};

export default Home;