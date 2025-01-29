import { FaCode, FaMobileAlt, FaCloud, FaDatabase } from "react-icons/fa";

const Services = () => (
  <section>
    <div>
      {/* Encabezado */}
      <div>
        <h1>Nuestros Servicios</h1>
        <p>
          En <span>RivasDev</span>, ofrecemos una gama completa de servicios tecnológicos diseñados para 
          transformar tus ideas en realidades digitales. Cada proyecto se aborda con precisión y pasión para garantizar resultados excepcionales.
        </p>
      </div>

      {/* Servicios */}
      <div>
        <div>
          <FaCode />
          <h3>Desarrollo Web</h3>
          <p>
            Sitios dinámicos y escalables, adaptados a tus necesidades y optimizados para cualquier dispositivo.
          </p>
        </div>
        <div>
          <FaMobileAlt />
          <h3>Aplicaciones Móviles</h3>
          <p>
            Desarrollamos aplicaciones intuitivas y atractivas para iOS y Android que potencian tu alcance digital.
          </p>
        </div>
        <div>
          <FaCloud />
          <h3>Soluciones en la Nube</h3>
          <p>
            Servicios confiables en la nube para optimizar tus procesos y garantizar una experiencia fluida.
          </p>
        </div>
        <div>
          <FaDatabase />
          <h3>Gestión de Datos</h3>
          <p>
            Soluciones seguras y escalables para manejar, almacenar y analizar datos clave de tu negocio.
          </p>
        </div>
      </div>

      {/* Llamado a la acción */}
      <div>
        <h2>¿Estás listo para transformar tu negocio con tecnología?</h2>
        <button>Contáctanos Hoy</button>
      </div>
    </div>
  </section>
);

export default Services;
