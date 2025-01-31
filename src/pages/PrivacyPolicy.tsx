import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Política de Privacidad</h1>
      <p className={styles.lastUpdated}>Última actualización: 10 de octubre de 2023</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Introducción</h2>
        <p className={styles.sectionText}>
          En Rivas RP Group LLC, nos comprometemos a proteger y respetar su privacidad. Esta política explica cómo recopilamos, usamos y protegemos su información personal.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Información que Recopilamos</h2>
        <p className={styles.sectionText}>
          Podemos recopilar y procesar los siguientes datos sobre usted:
        </p>
        <ul className={styles.list}>
          <li>Información de contacto (nombre, dirección de correo electrónico, número de teléfono).</li>
          <li>Datos de uso (cómo interactúa con nuestro sitio web).</li>
          <li>Información técnica (dirección IP, tipo de navegador, etc.).</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Uso de la Información</h2>
        <p className={styles.sectionText}>
          Utilizamos su información para:
        </p>
        <ul className={styles.list}>
          <li>Proporcionar y mejorar nuestros servicios.</li>
          <li>Personalizar su experiencia en nuestro sitio web.</li>
          <li>Enviar comunicaciones promocionales (si nos ha dado su consentimiento).</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Compartir Información</h2>
        <p className={styles.sectionText}>
          No compartimos su información personal con terceros, excepto cuando sea necesario para cumplir con la ley o proteger nuestros derechos.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Sus Derechos</h2>
        <p className={styles.sectionText}>
          Usted tiene derecho a acceder, corregir o eliminar su información personal. Para ejercer estos derechos, contáctenos en [correo electrónico].
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Cambios en esta Política</h2>
        <p className={styles.sectionText}>
          Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos cualquier cambio importante publicando la nueva política en nuestro sitio web.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;