import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaRegClock, FaRegCheckCircle, FaRegComments } from "react-icons/fa";
import styles from "./QuotationForm.module.css";

const API_URL = import.meta.env.VITE_API_URL; // 🔹 Agregado

const QuotationForm = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    details: "" 
  });
  const [status, setStatus] = useState<{ type: string; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Enviando solicitud..." });

    try {
      const response = await fetch(`${API_URL}/api/quotation`, { // 🔹 Modificado
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatus({ type: "success", message: "¡Solicitud enviada con éxito!" });
        setFormData({ name: "", email: "", phone: "", details: "" });
      } else {
        setStatus({ type: "error", message: result.message || "Error al enviar el formulario" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Error de conexión con el servidor" });
    }
  };

  return (
    <div className={styles.container}>
      {/* Sección del Formulario */}
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Solicita tu cotización</h2>
            <p className={styles.formSubtitle}>Completa el formulario y nos pondremos en contacto contigo</p>
          </div>

          <div className={styles.formGrid}>
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
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder=" "
                className={styles.formInput}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone" className={styles.inputLabel}>Teléfono</label>
            </div>

            <div className={styles.inputGroup}>
              <textarea
                name="details"
                id="details"
                placeholder=" "
                className={`${styles.formInput} ${styles.formTextarea}`}
                value={formData.details}
                onChange={handleChange}
                required
              />
              <label htmlFor="details" className={styles.inputLabel}>Detalles de tu proyecto</label>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={status?.type === "loading"}
          >
            {status?.type === "loading" ? "Enviando..." : "Solicitar cotización"}
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

      {/* Sección "Cómo Funciona" */}
      <div className={styles.stepsSection}>
        <h2 className={styles.stepsTitle}>Cómo funciona nuestro proceso</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              <FaRegComments />
              <div className={styles.stepNumber}>1</div>
            </div>
            <h3 className={styles.stepTitle}>Consulta Inicial</h3>
            <p className={styles.stepDescription}>
              Cuéntanos sobre tu proyecto y necesidades específicas mediante nuestro formulario.
            </p>
          </div>

          <div className={styles.stepArrow}>&rarr;</div>

          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              <FaRegClock />
              <div className={styles.stepNumber}>2</div>
            </div>
            <h3 className={styles.stepTitle}>Análisis y Cotización</h3>
            <p className={styles.stepDescription}>
              Nuestro equipo analizará los requerimientos y preparará una propuesta detallada en 24-48 horas.
            </p>
          </div>

          <div className={styles.stepArrow}>&rarr;</div>

          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              <FaRegCheckCircle />
              <div className={styles.stepNumber}>3</div>
            </div>
            <h3 className={styles.stepTitle}>Inicio del Proyecto</h3>
            <p className={styles.stepDescription}>
              Una vez aprobada la cotización, comenzamos a trabajar inmediatamente en tu solución.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationForm;