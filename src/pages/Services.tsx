import { FaCode, FaMobileAlt, FaCloud, FaDatabase } from "react-icons/fa";

const Services = () => (
  <section className="services-page bg-gradient-to-r from-[#88c0d0] to-[#5e81ac] text-white py-16 px-6">
    <div className="container mx-auto max-w-7xl">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">Nuestros Servicios</h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          En <span className="text-[#eceff4] font-semibold">RivasDev</span>, ofrecemos una gama completa de servicios tecnológicos diseñados para 
          transformar tus ideas en realidades digitales. Cada proyecto se aborda con precisión y pasión para garantizar resultados excepcionales.
        </p>
      </div>

      {/* Services Grid */}
      <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="service-card bg-[#2e3440] p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
          <FaCode className="text-6xl text-[#eceff4] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Desarrollo Web</h3>
          <p className="text-sm text-[#d8dee9]">
            Sitios dinámicos y escalables, adaptados a tus necesidades y optimizados para cualquier dispositivo.
          </p>
        </div>
        <div className="service-card bg-[#2e3440] p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
          <FaMobileAlt className="text-6xl text-[#eceff4] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Aplicaciones Móviles</h3>
          <p className="text-sm text-[#d8dee9]">
            Desarrollamos aplicaciones intuitivas y atractivas para iOS y Android que potencian tu alcance digital.
          </p>
        </div>
        <div className="service-card bg-[#2e3440] p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
          <FaCloud className="text-6xl text-[#eceff4] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Soluciones en la Nube</h3>
          <p className="text-sm text-[#d8dee9]">
            Servicios confiables en la nube para optimizar tus procesos y garantizar una experiencia fluida.
          </p>
        </div>
        <div className="service-card bg-[#2e3440] p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition duration-300">
          <FaDatabase className="text-6xl text-[#eceff4] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Gestión de Datos</h3>
          <p className="text-sm text-[#d8dee9]">
            Soluciones seguras y escalables para manejar, almacenar y analizar datos clave de tu negocio.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section bg-[#2e3440] p-10 rounded-lg shadow-lg text-center mt-16">
        <h2 className="text-4xl font-bold mb-6 text-[#88c0d0]">
          ¿Estás listo para transformar tu negocio con tecnología?
        </h2>
        <button className="px-10 py-4 bg-[#88c0d0] text-[#2e3440] font-semibold rounded-lg text-lg shadow-lg hover:bg-[#5e81ac] hover:text-white transition duration-300">
          Contáctanos Hoy
        </button>
      </div>
    </div>
  </section>
);

export default Services;
