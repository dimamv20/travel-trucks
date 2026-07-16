import emptyImage from "../../assets/images/empty-state.png";

import css from "./EmptyState.module.css";

const EmptyState = ({ onClear }) => {
  return (
    <div className={css.wrapper}>
      <img
        className={css.image}
        src={emptyImage}
        alt="Camper not found"
      />

      <h2 className={css.title}>No campers found</h2>

      <p className={css.text}>
        We couldn&apos;t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={css.actions}>
        <button className={css.clear} type="button" onClick={onClear}>
          <span aria-hidden="true">×</span>
          Clear filters
        </button>

        <button className={css.viewAll} type="button" onClick={onClear}>
          View all campers
        </button>
      </div>
    </div>
  );
};

export default EmptyState;