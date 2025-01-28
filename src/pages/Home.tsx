import HeroHeader from "../components/HeroHeader";
import ReviewForm from "../components/ReviewForm"; // Asegúrate de haber creado este componente

const Home = () => {
  return (
    <>
      <HeroHeader />

      {/* Secciones horizontales */}
      <section className="horizontal-sections">
        {/* Desarrollo Web Section */}
        <div className="content-box">
          <h2 className="section-title">Desarrollo Web</h2>
          <p className="section-description">
            Ofrecemos soluciones personalizadas para la creación de sitios web, optimizados y adaptativos para cualquier dispositivo.
          </p>
          <ul className="features-list">
            <li>Diseño Responsive</li>
            <li>Optimización SEO</li>
            <li>Integración con APIs</li>
          </ul>
        </div>

        {/* Plantillas Section */}
        <div className="content-box">
          <h2 className="section-title">Plantillas Web</h2>
          <p className="section-description">
            Explora nuestras plantillas profesionales para darle un toque único a tu sitio web con diseños modernos y funcionales.
          </p>
          <ul className="features-list">
            <li>Diseños Personalizables</li>
            <li>Compatibilidad Multiplataforma</li>
            <li>Soporte Técnico Incluido</li>
          </ul>
        </div>

        {/* Mantenimiento Section */}
        <div className="content-box">
          <h2 className="section-title">Mantenimiento Web</h2>
          <p className="section-description">
            Asegúrate de que tu sitio web esté siempre actualizado y funcionando de manera óptima con nuestros servicios de mantenimiento.
          </p>
          <ul className="features-list">
            <li>Actualizaciones Regulares</li>
            <li>Resolución de Problemas</li>
            <li>Monitoreo Continuo</li>
          </ul>
        </div>
      </section>

      {/* Reseñas Section */}
      <section className="reviews-section py-16 px-6">
        <h2 className="reviews-title"></h2>
        <ReviewForm />
      </section>
    </>
  );
};

export default Home;
