import { FaLaptopCode, FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about-page bg-gradient-to-b from-[#5e81ac] to-[#88c0d0] text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">
            Acerca de <span className="text-[#eceff4]">Nosotros</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-justify">
            En RivasDev, nuestra pasión es la tecnología y la innovación,esde nuestro inicio, hemos trabajado
            arduamente para ser más que un proveedor de servicios; queremos ser un socio confiable para cada cliente.
            Creemos en transformar ideas en realidades digitales que destaquen y generen un impacto duradero.
          </p>
        </div>

        {/* Features Section */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="feature-card bg-[#2e3440] p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
            <FaLaptopCode className="text-6xl text-[#eceff4] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Desarrollo Web</h3>
            <p className="text-sm text-[#d8dee9]">
              Creamos sitios web dinámicos, rápidos y estéticamente impresionantes, optimizados para cualquier dispositivo.
            </p>
          </div>
          <div className="feature-card bg-[#2e3440] p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
            <FaUsers className="text-6xl text-[#eceff4] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Atención Personalizada</h3>
            <p className="text-sm text-[#d8dee9]">
              Cada cliente es único. Nos aseguramos de escuchar, entender y superar sus expectativas en cada proyecto.
            </p>
          </div>
          <div className="feature-card bg-[#2e3440] p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
            <FaLightbulb className="text-6xl text-[#eceff4] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Innovación Constante</h3>
            <p className="text-sm text-[#d8dee9]">
              Nos mantenemos a la vanguardia de las tecnologías para ofrecer soluciones modernas y efectivas.
            </p>
          </div>
          <div className="feature-card bg-[#2e3440] p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
            <FaRocket className="text-6xl text-[#eceff4] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Resultados Impactantes</h3>
            <p className="text-sm text-[#d8dee9]">
              Tu éxito es nuestro objetivo. Creamos soluciones que generan resultados reales y medibles.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="vision-section bg-[#2e3440] p-10 rounded-lg shadow-lg mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#88c0d0]">Nuestra Visión</h2>
          <p className="text-lg text-[#d8dee9] leading-relaxed">
            En un mundo donde la tecnología avanza constantemente, nuestra visión es liderar la transformación digital.
            Queremos ser reconocidos por nuestra excelencia, innovación y compromiso, convirtiéndonos en la primera opción
            para empresas y emprendedores en busca de soluciones tecnológicas excepcionales.
          </p>
        </div>

        {/* Call to Action */}
        <div className="cta-section text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#eceff4]">
            ¿Listo para llevar tu proyecto al siguiente nivel?
          </h2>
          <Link to="/contacto">
            <button className="px-10 py-4 bg-[#88c0d0] text-[#2e3440] font-semibold rounded-lg text-lg shadow-lg hover:bg-[#5e81ac] hover:text-white transition duration-300">
              Contáctanos Ahora
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
