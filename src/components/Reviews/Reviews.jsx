import css from "./Reviews.module.css";

const Reviews = ({ reviews = [] }) => {
  return (
    <section className={css.reviews}>
      <h2 className={css.title}>Reviews</h2>

      <ul className={css.list}>
        {reviews.map((review, index) => {
          const rating = Number(review.reviewer_rating) || 0;

          return (
            <li
              className={css.item}
              key={`${review.reviewer_name}-${index}`}
            >
              <div className={css.header}>
                <div className={css.avatar}>
                  {review.reviewer_name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className={css.name}>{review.reviewer_name}</h3>

                  <div
                    className={css.rating}
                    aria-label={`${rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <span
                        className={
                          starIndex < rating
                            ? css.starActive
                            : css.starInactive
                        }
                        key={starIndex}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className={css.comment}>{review.comment}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Reviews;