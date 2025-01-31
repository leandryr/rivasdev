import { FaGithub, FaLinkedin, FaTwitter, FaRegEnvelope } from "react-icons/fa";
import styles from "./Footer.module.css";
import logo from "../assets/imag/2.png";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerSection}>
      <img src={logo} alt="RivasDev Logo" className={styles.logo} />
        <p className={styles.sectionText}>
          Transformando ideas en soluciones digitales extraordinarias.
        </p>
      </div>

      <div className={styles.footerSection}>
        <h4 className={styles.sectionSubtitle}>Enlaces Rápidos</h4>
        <ul className={styles.linkList}>
          <li><a href="/servicios" className={styles.footerLink}>Servicios</a></li>
          <li><a href="/portafolio" className={styles.footerLink}>Portafolio</a></li>
          <li><a href="/blog" className={styles.footerLink}>Blog</a></li>
          <li><a href="/contacto" className={styles.footerLink}>Contacto</a></li>
        </ul>
      </div>

      <div className={styles.footerSection}>
        <h4 className={styles.sectionSubtitle}>Conectemos</h4>
        <div className={styles.socialContainer}>
          <a href="https://github.com/leandryr" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaGithub className={styles.socialIcon} />
          </a>
          <a href="https://linkedin.com/in/leandry-rivas-a02246309" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaLinkedin className={styles.socialIcon} />
          </a>
          <a href="https://x.com/leandryrp" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <FaTwitter className={styles.socialIcon} />
          </a>
          <a href="mailto:contacto@rivasdev.com" className={styles.socialLink}>
            <FaRegEnvelope className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </div>

    <div className={styles.footerBottom}>
      <p className={styles.copyright}>
        © 2025 RivasDev. Todos los derechos reservados.
      </p>
      <div className={styles.legalLinks}>
        <a href="/PrivacyPolicy" className={styles.legalLink}>Política de Privacidad</a>
        <span className={styles.separator}>|</span>
        <a href="/TermsOfService" className={styles.legalLink}>Términos de Servicio</a>
      </div>
    </div>
  </footer>
);

export default Footer;