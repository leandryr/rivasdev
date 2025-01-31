import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { FaStar, FaRegStar, FaCheckCircle } from "react-icons/fa";
import styles from "./ReviewForm.module.css";

interface ReviewFormState {
  name: string;
  email: string;
  review: string;
  rating: number;
}

interface Review {
  name: string;
  email: string;
  review: string;
  rating: number;
  createdAt: string;
}

const ReviewForm = () => {
  const [formData, setFormData] = useState<ReviewFormState>({
    name: "",
    email: "",
    review: "",
    rating: 0,
  });

  const [reviews, setReviews] = useState<Review[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState(0);

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating: number) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.rating === 0) {
      alert("Por favor, califica con estrellas");
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
        setReviews((prev) => [data.review, ...prev]);
        setFormData({ name: "", email: "", review: "", rating: 0 });
        setSuccessMessage("¡Reseña publicada!");
        setTimeout(() => setSuccessMessage(null), 3000);
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
    <div className={styles.container}>
      {/* Formulario */}
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <h2 className={styles.formTitle}>Deja tu testimonio</h2>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            className={styles.formInput}
            required
          />
          <label className={styles.inputLabel}>Nombre completo</label>
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className={styles.formInput}
            required
          />
          <label className={styles.inputLabel}>Correo electrónico</label>
        </div>

        <div className={styles.ratingContainer}>
          <p className={styles.ratingLabel}>Calificación:</p>
          <div className={styles.stars}>
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  type="button"
                  key={ratingValue}
                  className={styles.starButton}
                  onMouseEnter={() => setHoverRating(ratingValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingChange(ratingValue)}
                >
                  {ratingValue <= (hoverRating || formData.rating) ? (
                    <FaStar className={styles.starFilled} />
                  ) : (
                    <FaRegStar className={styles.starEmpty} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder=" "
            className={`${styles.formInput} ${styles.textarea}`}
            required
          />
          <label className={styles.inputLabel}>Escribe tu testimonio</label>
        </div>

        <button type="submit" className={styles.submitButton}>
          Publicar testimonio
        </button>

        {successMessage && (
          <div className={styles.successMessage}>
            <FaCheckCircle />
            <span>{successMessage}</span>
          </div>
        )}
      </form>

      {/* Lista de Testimonios */}
      <div className={styles.reviewsSection}>
        <h3 className={styles.reviewsTitle}>Testimonios ({reviews.length})</h3>

        <div className={styles.reviewsScrollContainer}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{review.name}</span>
                    <div className={styles.reviewStars}>
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className={styles.starFilled} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={styles.reviewText}>{review.review}</p>
                <span className={styles.reviewDate}>
                  {formatDate(review.createdAt)}
                </span>
              </div>
            ))
          ) : (
            <p className={styles.noReviews}>Sé el primero en dejar un testimonio</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
