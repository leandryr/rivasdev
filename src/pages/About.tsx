import { FaLaptopCode, FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.aboutSection}>
      {/* Encabezado */}
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Acerca de <span>Nosotros</span>
          </h1>
          <p className={styles.heroText}>
            En RivasDev, nuestra pasión es la tecnología y la innovación. Desde nuestro inicio, hemos trabajado
            arduamente para ser más que un proveedor de servicios; queremos ser un socio confiable para cada cliente.
            Creemos en transformar ideas en realidades digitales que destaquen y generen un impacto duradero.
          </p>
        </div>
      </div>

      {/* Características */}
      <div className={styles.featuresContainer}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <FaLaptopCode className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>Desarrollo Web</h3>
            <p className={styles.featureText}>
              Creamos sitios web dinámicos, rápidos y estéticamente impresionantes, optimizados para cualquier dispositivo.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <FaUsers className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>Atención Personalizada</h3>
            <p className={styles.featureText}>
              Cada cliente es único. Nos aseguramos de escuchar, entender y superar sus expectativas en cada proyecto.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <FaLightbulb className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>Innovación Constante</h3>
            <p className={styles.featureText}>
              Nos mantenemos a la vanguardia de las tecnologías para ofrecer soluciones modernas y efectivas.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <FaRocket className={styles.featureIcon} />
            </div>
            <h3 className={styles.featureTitle}>Resultados Impactantes</h3>
            <p className={styles.featureText}>
              Tu éxito es nuestro objetivo. Creamos soluciones que generan resultados reales y medibles.
            </p>
          </div>
        </div>
      </div>

      {/* Visión */}
      <div className={styles.visionContainer}>
        <div className={styles.visionContent}>
          <h2 className={styles.visionTitle}>Nuestra Visión</h2>
          <p className={styles.visionText}>
            En un mundo donde la tecnología avanza constantemente, nuestra visión es liderar la transformación digital.
            Queremos ser reconocidos por nuestra excelencia, innovación y compromiso, convirtiéndonos en la primera opción
            para empresas y emprendedores en busca de soluciones tecnológicas excepcionales.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>¿Listo para llevar tu proyecto al siguiente nivel?</h2>
          <Link to="/contacto" className={styles.ctaButton}>
            Contáctanos Ahora
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;