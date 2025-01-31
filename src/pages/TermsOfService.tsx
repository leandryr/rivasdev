import React from 'react';
import styles from './TermsOfService.module.css';

const TermsOfService: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Términos de Servicio</h1>
      <p className={styles.lastUpdated}>Última actualización: 28 de Enero de 2025</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Aceptación de los Términos</h2>
        <p className={styles.sectionText}>
          Al acceder y utilizar nuestro sitio web, usted acepta cumplir con estos Términos de Servicio. Si no está de acuerdo con alguno de estos términos, no podrá utilizar nuestros servicios.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Uso del Servicio</h2>
        <p className={styles.sectionText}>
          Usted acepta utilizar nuestro servicio únicamente para fines legales y de acuerdo con estos Términos de Servicio. No está permitido:
        </p>
        <ul className={styles.list}>
          <li>Utilizar el servicio para actividades ilegales o fraudulentas.</li>
          <li>Intentar acceder a áreas restringidas del servicio sin autorización.</li>
          <li>Interferir con la operación normal del servicio.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Propiedad Intelectual</h2>
        <p className={styles.sectionText}>
          Todo el contenido del servicio, incluyendo textos, gráficos, logotipos y software, es propiedad de Rivas RP Group LLC y está protegido por las leyes de propiedad intelectual.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Limitación de Responsabilidad</h2>
        <p className={styles.sectionText}>
          Rivas RP Group LLC no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del servicio.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Modificaciones</h2>
        <p className={styles.sectionText}>
          Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Le notificaremos cualquier cambio importante publicando la versión actualizada en nuestro sitio web.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Contacto</h2>
        <p className={styles.sectionText}>
          Si tiene alguna pregunta sobre estos Términos de Servicio, contáctenos en [correo electrónico].
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;