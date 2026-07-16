import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CookingPot,
  Fuel,
  Heart,
  Map,
  Settings,
  ShowerHead,
  Star,
  Wind,
} from "lucide-react";

import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { selectFavorites } from "../../redux/favorites/favoritesSelectors";

import css from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(camper.id);

  const features = [
    {
      label: camper.engine,
      icon: Fuel,
      visible: Boolean(camper.engine),
    },
    {
      label: camper.transmission,
      icon: Settings,
      visible: Boolean(camper.transmission),
    },
    {
      label: "AC",
      icon: Wind,
      visible: Boolean(camper.AC),
    },
    {
      label: "Kitchen",
      icon: CookingPot,
      visible: Boolean(camper.kitchen),
    },
    {
      label: "Bathroom",
      icon: ShowerHead,
      visible: Boolean(camper.bathroom),
    },
  ].filter(feature => feature.visible);

  return (
    <li className={css.card}>
      <img
        className={css.image}
        src={camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original}
        alt={camper.name}
      />

      <div className={css.info}>
        <div className={css.top}>
          <h2 className={css.name}>{camper.name}</h2>

          <div className={css.actions}>
            <p className={css.price}>
              €{Number(camper.price).toFixed(2)}
            </p>

            <button
              className={`${css.favorite} ${
                isFavorite ? css.favoriteActive : ""
              }`}
              type="button"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              onClick={() => dispatch(toggleFavorite(camper.id))}
            >
              <Heart
                size={26}
                strokeWidth={1.8}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>

        <div className={css.meta}>
          <span className={css.rating}>
            <Star
              className={css.star}
              size={16}
              fill="currentColor"
              strokeWidth={1.8}
            />

            {camper.rating} ({camper.reviews?.length ?? 0} Reviews)
          </span>

          <span className={css.location}>
            <Map size={16} strokeWidth={1.8} />
            {camper.location}
          </span>
        </div>

        <p className={css.description}>{camper.description}</p>

        <div className={css.features}>
          {features.map(({ label, icon: Icon }) => (
            <span className={css.feature} key={label}>
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </span>
          ))}
        </div>

        <Link
          className={css.button}
          to={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Link>
      </div>
    </li>
  );
};

export default CamperCard;