import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: string; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Enviando mensaje..." });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatus({ type: "success", message: "¡Mensaje enviado con éxito!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: result.message || "Error al enviar el mensaje" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Error de conexión con el servidor" });
    }
  };

  return (
    <section className={styles.contactSection}>
      {/* Encabezado */}
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Contáctanos</h1>
          <p className={styles.heroText}>
            En <span>RivasDev</span>, nos encanta saber de ti. Ya sea para resolver dudas,
            iniciar un proyecto o simplemente saludar, estamos aquí para ayudarte.
          </p>
        </div>
      </div>

      <div className={styles.contactContainer}>
        {/* Información de Contacto */}
        <div className={styles.infoContainer}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaEnvelope />
            </div>
            <h3 className={styles.infoTitle}>Email</h3>
            <p className={styles.infoText}>info@rivasdev.com</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaPhone />
            </div>
            <h3 className={styles.infoTitle}>Teléfono</h3>
            <p className={styles.infoText}>+1 (404) 839-4292</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaMapMarkerAlt />
            </div>
            <h3 className={styles.infoTitle}>Ubicación</h3>
            <p className={styles.infoText}>Atlanta, Georgia, EE.UU.</p>
          </div>
        </div>

        {/* Formulario y Mapa */}
        <div className={styles.formMapContainer}>
          {/* Formulario */}
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Envíanos un Mensaje</h2>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=" "
                  className={styles.formInput}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name" className={styles.inputLabel}>Nombre completo</label>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" "
                  className={styles.formInput}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email" className={styles.inputLabel}>Correo electrónico</label>
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  id="message"
                  placeholder=" "
                  className={`${styles.formInput} ${styles.formTextarea}`}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="message" className={styles.inputLabel}>Tu mensaje</label>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={status?.type === "loading"}
              >
                {status?.type === "loading" ? "Enviando..." : "Enviar Mensaje"}
              </button>

              {status && (
                <div className={`${styles.statusMessage} ${styles[status.type]}`}>
                  {status.type === "success" ? (
                    <FaCheckCircle className={styles.statusIcon} />
                  ) : (
                    <FaTimesCircle className={styles.statusIcon} />
                  )}
                  <span className={styles.statusText}>{status.message}</span>
                </div>
              )}
            </form>
          </div>

          {/* Mapa */}
          <div className={styles.mapContainer}>
            <h2 className={styles.mapTitle}>Nuestra Ubicación</h2>
            <div className={styles.mapWrapper}>
              <iframe
                title="Mapa de RivasDev"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8662835193857!2d-84.38974048467663!3d33.74909898068773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5046110e7663b%3A0x32c9d0c1e1d04c8e!2sAtlanta%2C%20GA%2C%20USA!5e0!3m2!1sen!2sve!4v1678988490619!5m2!1sen!2sve"
                className={styles.mapIframe}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;