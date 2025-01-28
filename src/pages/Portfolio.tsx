import { FaCode, FaMobileAlt, FaPaintBrush, FaCogs } from "react-icons/fa";

const projects = [
  {
    title: "Sitio Web Corporativo",
    description: "Diseño y desarrollo de un sitio web corporativo para empresas modernas.",
    icon: <FaCode />,
  },
  {
    title: "Aplicación Móvil",
    description: "Desarrollo de una aplicación móvil con UI/UX optimizado para iOS y Android.",
    icon: <FaMobileAlt />,
  },
  {
    title: "Diseño Creativo",
    description: "Creación de interfaces gráficas únicas y personalizadas.",
    icon: <FaPaintBrush />,
  },
  {
    title: "Automatización de Procesos",
    description: "Soluciones tecnológicas para mejorar la eficiencia empresarial.",
    icon: <FaCogs />,
  },
];

const works = [
  {
    title: "E-commerce Personalizado",
    description: "Plataforma de comercio electrónico diseñada para maximizar ventas.",
    image: "src/assets/images/ecommerce.jpg",
    link: "/projects/ecommerce",
  },
  {
    title: "Blog Interactivo",
    description: "Blog optimizado para SEO con un diseño moderno y funcional.",
    image: "src/assets/images/blog.jpg",
    link: "/projects/blog",
  },
  {
    title: "Gestor de Tareas",
    description: "Aplicación para organizar tareas y proyectos con una interfaz amigable.",
    image: "src/assets/images/task-manager.jpg",
    link: "/projects/task-manager",
  },
];

const Portfolio = () => {
  return (
    <section className="portfolio-page bg-gradient-to-b from-[#5e81ac] to-[#88c0d0] text-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">Nuestro Portfolio</h1>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto text-justify">
            En <span className="text-[#eceff4] font-semibold">RivasDev</span>, hemos transformado ideas en realidades digitales excepcionales.
            Aquí encontrarás una selección de nuestros proyectos más destacados que combinan tecnología, creatividad y resultados impactantes.
          </p>
        </div>

        {/* Feature Section */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-[#2e3440] p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 text-center"
            >
              <div className="icon text-6xl text-[#88c0d0] mb-4">{project.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-[#d8dee9]">{project.description}</p>
            </div>
          ))}
        </div>

        {/* Works Section */}
        <div className="works-section">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#eceff4]">
            Trabajos Destacados
          </h2>
          <div className="works-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <div
                key={index}
                className="work-card bg-[#2e3440] rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="rounded-t-lg h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#88c0d0]">
                    {work.title}
                  </h3>
                  <p className="text-sm text-[#d8dee9] mb-4">{work.description}</p>
                  <a
                    href={work.link}
                    className="px-4 py-2 bg-[#88c0d0] text-[#2e3440] font-semibold rounded-lg hover:bg-[#5e81ac] hover:text-white transition duration-300"
                  >
                    Ver Proyecto
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
