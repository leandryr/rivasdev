import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import slide1 from "../assets/images/slide1.webp";
import slide2 from "../assets/images/slide2.webp";
import slide3 from "../assets/images/slide3.webp";
import styles from "./HeroHeader.module.css";

const slides = [
  {
    title: "Desarrollo Web Moderno y Personalizado",
    description:
      "Impulsa tu negocio con soluciones innovadoras y efectivas diseñadas a la medida de tus necesidades.",
    buttonText: "Contáctanos",
    backgroundImage: slide1,
  },
  {
    title: "Diseños Responsivos para Cada Dispositivo",
    description:
      "Nos aseguramos de que tu sitio web luzca increíble en cualquier pantalla, ya sea móvil, tableta o escritorio.",
    buttonText: "Ver Proyectos",
    backgroundImage: slide2,
  },
  {
    title: "Tecnología de Vanguardia",
    description:
      "Utilizamos las últimas tecnologías para garantizar la velocidad, seguridad y calidad de tus proyectos.",
    buttonText: "Más Información",
    backgroundImage: slide3,
  },
];

const HeroHeader: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleSlideChange = (newIndex: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setIsAnimating(false);
    }, 500);
  };

  const { title, description, buttonText, backgroundImage } = slides[currentSlide];

  return (
    <header 
      className={styles.heroHeader} 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}></div>
      
      <div className={`${styles.content} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <Link to="/contacto" className={styles.button}>
          {buttonText}
          <span className={styles.buttonHover}></span>
        </Link>
      </div>

      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${currentSlide === index ? styles.active : ""}`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
};

export default HeroHeader;