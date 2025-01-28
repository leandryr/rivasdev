import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact-page bg-gradient-to-b from-[#5e81ac] to-[#88c0d0] text-white py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">Contáctanos</h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-justify">
            En <span className="text-[#eceff4] font-semibold">RivasDev</span>, nos encanta saber de ti. Ya sea para resolver dudas,
            iniciar un proyecto o simplemente saludar, estamos aquí para ayudarte. Completa el formulario o utiliza
            cualquiera de los métodos a continuación para comunicarte con nosotros.
          </p>
        </div>

        {/* Contact Information */}
        <div className="contact-info grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
          <div className="info-card bg-[#2e3440] p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <FaEnvelope className="text-5xl text-[#eceff4] mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Email</h3>
            <p className="text-sm text-[#d8dee9]">info@rivasdev.com</p>
          </div>
          <div className="info-card bg-[#2e3440] p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <FaPhone className="text-5xl text-[#eceff4] mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Teléfono</h3>
            <p className="text-sm text-[#d8dee9]">+1 (123) 456-7890</p>
          </div>
          <div className="info-card bg-[#2e3440] p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <FaMapMarkerAlt className="text-5xl text-[#eceff4] mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Ubicación</h3>
            <p className="text-sm text-[#d8dee9]">Atlanta, Georgia, EE.UU.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form bg-[#2e3440] p-10 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-4 text-[#88c0d0] text-center">Envíanos un Mensaje</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              type="text"
              placeholder="Tu Nombre"
              className="input-field"
              required
            />
            <input
              type="email"
              placeholder="Tu Email"
              className="input-field"
              required
            />
            <textarea
              placeholder="Tu Mensaje"
              className="input-field md:col-span-2 h-32"
              required
            />
            <button
              type="submit"
              className="md:col-span-2 px-10 py-4 bg-[#88c0d0] text-[#2e3440] font-semibold rounded-lg text-lg shadow-lg hover:bg-[#5e81ac] hover:text-white transition duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="map-section bg-[#2e3440] p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-[#88c0d0] text-center">Nuestra Ubicación</h2>
          <iframe
            title="Mapa de RivasDev"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8662835193857!2d-84.38974048467663!3d33.74909898068773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5046110e7663b%3A0x32c9d0c1e1d04c8e!2sAtlanta%2C%20GA%2C%20USA!5e0!3m2!1sen!2sve!4v1678988490619!5m2!1sen!2sve"
            className="w-full h-96 rounded-lg"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
