import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCampers } from "../redux/campers/campersOperations";

import {
  loadMore,
  resetVisibleCount,
} from "../redux/campers/campersSlice";

import {
  selectCampers,
  selectError,
  selectIsLoading,
  selectVisibleCount,
} from "../redux/campers/campersSelectors";

import { clearFilters } from "../redux/filters/filtersSlice";
import { selectFilters } from "../redux/filters/filtersSelectors";

import CamperList from "../components/CamperList/CamperList";
import EmptyState from "../components/EmptyState/EmptyState";
import Filters from "../components/Filters/Filters";
import Loader from "../components/Loader/Loader";
import LoadMoreButton from "../components/LoadMoreButton/LoadMoreButton";

import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const visibleCount = useSelector(selectVisibleCount);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const filteredCampers = campers.filter(camper => {
    const locationMatches =
      !filters.location ||
      camper.location
        ?.toLowerCase()
        .includes(filters.location.toLowerCase());

    const formMatches =
      !filters.form || camper.form === filters.form;

    const equipmentMatches = filters.equipment.every(item => {
      const transmissions = ["automatic", "manual"];
      const engines = ["diesel", "petrol", "hybrid", "electric"];

      if (transmissions.includes(item)) {
        return camper.transmission === item;
      }

      if (engines.includes(item)) {
        return camper.engine === item;
      }

      return Boolean(camper[item]);
    });

    return locationMatches && formMatches && equipmentMatches;
  });

  const visibleCampers = filteredCampers.slice(0, visibleCount);
  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(resetVisibleCount());
  };

  return (
    <section className={css.page}>
      <h1 className={css.title}>Catalog</h1>

      <div className={css.content}>
        <Filters />

        <div className={css.results}>
          {isLoading && <Loader />}

          {error && <p className={css.error}>{error}</p>}

          {!isLoading && !error && (
            <>
              {filteredCampers.length > 0 ? (
                <CamperList campers={visibleCampers} />
              ) : (
                <EmptyState onClear={handleClearFilters} />
              )}

              {visibleCount < filteredCampers.length && (
                <LoadMoreButton
                  onClick={() => dispatch(loadMore())}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;