import styles from "./Reservas.module.css";
import previewImage from "../assets/images/reservas-preview.png";

const ReservasPortfolio = () => {
  return (
    <section className={styles.reservasSection}>
      <header className={styles.header}>
        <h1>CARPER - Registro Campamento 2025</h1>
        <p>Sistema de gestión eficiente para eventos y registros</p>
      </header>

      <div className={styles.previewContainer}>
        <h2 className={styles.sectionTitle}>Características del Proyecto:</h2>
        <ul className={styles.featureList}>
          <li>✔️ Gestión dinámica de asistentes.</li>
          <li>✔️ Cálculo automático del costo total.</li>
          <li>✔️ Integración con instrucciones de pago claras.</li>
          <li>✔️ Diseño intuitivo y responsivo.</li>
          <li>✔️ Panel administrativo protegido con estadísticas detalladas.</li>
        </ul>

        <div className={styles.imagePreview}>
        <img src={previewImage} alt="Vista previa del sistema de reservas" className={styles.previewImage} />
        </div>

        <p className={styles.description}>
          Este proyecto fue desarrollado para optimizar la gestión de registros en campamentos, permitiendo a los organizadores manejar asistentes y pagos de manera eficiente. Además, incluye una sección administrativa con estadísticas completas y exportación de datos.
        </p>

      </div>
    </section>
  );
};

export default ReservasPortfolio;
