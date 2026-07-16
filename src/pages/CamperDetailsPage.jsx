import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCamperById } from "../redux/campers/campersOperations";
import { clearSelectedCamper } from "../redux/campers/campersSlice";

import {
  selectSelectedCamper,
  selectIsLoading,
  selectError,
} from "../redux/campers/campersSelectors";

import BookingForm from "../components/BookingForm/BookingForm";
import Loader from "../components/Loader/Loader";
import Reviews from "../components/Reviews/Reviews";

import {
  CookingPot,
  Fuel,
  Map,
  Radio,
  Settings,
  Star,
  Wind,
} from "lucide-react";

import css from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const camper = useSelector(selectSelectedCamper);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    dispatch(fetchCamperById(id));

    return () => {
      dispatch(clearSelectedCamper());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (camper?.gallery?.length) {
      setActiveImage(
        camper.gallery[0].original || camper.gallery[0].thumb
      );
    }
  }, [camper]);

  if (isLoading) {
    return (
      <div className={css.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className={css.error}>{error}</p>;
  }

  if (!camper) {
    return null;
  }

  const features = [
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
      label: camper.engine,
      icon: Fuel,
      visible: Boolean(camper.engine),
    },
    {
      label: "Kitchen",
      icon: CookingPot,
      visible: Boolean(camper.kitchen),
    },
    {
      label: "Radio",
      icon: Radio,
      visible: Boolean(camper.radio),
    },
  ].filter(feature => feature.visible);

  return (
    <section className={css.page}>
      <div className={css.topGrid}>
        <div className={css.galleryColumn}>
          <img
            className={css.mainImage}
            src={activeImage}
            alt={camper.name}
          />

          <div className={css.thumbnails}>
            {camper.gallery?.map((image, index) => {
              const imageUrl = image.original || image.thumb;
              const isActive = activeImage === imageUrl;

              return (
                <button
                  className={`${css.thumbnailButton} ${
                    isActive ? css.thumbnailActive : ""
                  }`}
                  key={imageUrl || index}
                  type="button"
                  onClick={() => setActiveImage(imageUrl)}
                >
                  <img
                    src={image.thumb || image.original}
                    alt={`${camper.name} ${index + 1}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className={css.infoColumn}>
          <div className={css.infoCard}>
            <h1 className={css.name}>{camper.name}</h1>

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

            <p className={css.price}>
              €{Number(camper.price).toFixed(2)}
            </p>

            <p className={css.description}>{camper.description}</p>
          </div>

          <div className={css.detailsCard}>
            <h2 className={css.sectionTitle}>Vehicle details</h2>

            <div className={css.features}>
              {features.map(({ label, icon: Icon }) => (
                <span className={css.feature} key={label}>
                  <Icon size={18} strokeWidth={1.8} />
                  {label}
                </span>
              ))}
            </div>

            <div className={css.divider} />

            <ul className={css.detailsList}>
              <li>
                <span>Form</span>
                <span>{camper.form}</span>
              </li>
              <li>
                <span>Length</span>
                <span>{camper.length}</span>
              </li>
              <li>
                <span>Width</span>
                <span>{camper.width}</span>
              </li>
              <li>
                <span>Height</span>
                <span>{camper.height}</span>
              </li>
              <li>
                <span>Tank</span>
                <span>{camper.tank}</span>
              </li>
              <li>
                <span>Consumption</span>
                <span>{camper.consumption}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={css.bottomGrid}>
        <Reviews reviews={camper.reviews} />
        <BookingForm />
      </div>
    </section>
  );
};

export default CamperDetailsPage;