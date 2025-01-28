import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { FaStar } from "react-icons/fa";

interface ReviewFormState {
  name: string;
  email: string;
  review: string;
  rating: string;
}

interface Review {
  name: string;
  review: string;
  rating: string;
  createdAt: string;
}

const ReviewForm = () => {
  const [formData, setFormData] = useState<ReviewFormState>({
    name: "",
    email: "",
    review: "",
    rating: "0",
  });

  const [reviews, setReviews] = useState<Review[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error al cargar las reseñas:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.rating === "0") {
      alert("Por favor, elige una calificación.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setReviews((prevReviews) => [data.review, ...prevReviews]);
        setFormData({ name: "", email: "", review: "", rating: "0" });
        setSuccessMessage("¡Gracias por tu reseña!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert("Error al enviar la reseña");
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="review-container" style={{ display: "flex", gap: "2rem" }}>
      <form onSubmit={handleSubmit} className="review-form" style={{ flex: 1 }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre y Apellido"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Tu correo electrónico"
          required
        />
        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
          placeholder="Escribe tu reseña aquí"
          required
        />
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value="0">Elige una calificación</option>
          <option value="1">1 Estrella</option>
          <option value="2">2 Estrellas</option>
          <option value="3">3 Estrellas</option>
          <option value="4">4 Estrellas</option>
          <option value="5">5 Estrellas</option>
        </select>
        <button type="submit">Enviar</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>

      <div
        className="review-list"
        style={{
          flex: 1,
          maxHeight: "300px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <h3>Reseñas:</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              style={{
                marginBottom: "1rem",
                padding: "0.5rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              <strong>{review.name}</strong>
              <p>{review.review}</p>
              <div
                style={{
                  marginTop: "0.5rem",
                  color: "gold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {Array.from({ length: parseInt(review.rating) }, (_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <small>Publicado el {formatDate(review.createdAt)}</small>
            </div>
          ))
        ) : (
          <p>No hay reseñas aún.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
