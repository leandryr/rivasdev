import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import slide1 from "../assets/images/slide1.svg";
import slide2 from "../assets/images/slide2.svg";
import slide3 from "../assets/images/slide3.svg";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const { title, description, buttonText, backgroundImage } = slides[currentSlide];

  return (
    <header
      className="text-white flex flex-col items-center justify-center text-center py-24 px-6 transition-all duration-500"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold leading-snug max-w-4xl bg-black bg-opacity-30 px-6 py-2 rounded-lg shadow-lg">
        {title}
      </h1>
      <p className="text-xl mt-6 max-w-2xl bg-black bg-opacity-30 px-6 py-2 rounded-lg shadow-lg">
        {description}
      </p>
      <Link to="/contacto">
        <button className="mt-8 px-10 py-4 bg-secondary text-white font-semibold rounded-lg text-lg shadow-lg hover:bg-primary transition duration-300">
          {buttonText}
        </button>
      </Link>
    </header>
  );
};

export default HeroHeader;
