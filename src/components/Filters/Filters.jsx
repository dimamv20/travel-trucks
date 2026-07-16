import { useState } from "react";
import { useDispatch } from "react-redux";

import { setFilters, clearFilters } from "../../redux/filters/filtersSlice";
import { resetVisibleCount } from "../../redux/campers/campersSlice";

import { Map } from "lucide-react";

import css from "./Filters.module.css";

const formOptions = [
  { label: "Alcove", value: "alcove" },
  { label: "Panel Van", value: "panelTruck" },
  { label: "Integrated", value: "fullyIntegrated" },
  { label: "Semi Integrated", value: "semiIntegrated" },
];

const engineOptions = [
  { label: "Diesel", value: "diesel" },
  { label: "Petrol", value: "petrol" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Electric", value: "electric" },
];

const transmissionOptions = [
  { label: "Automatic", value: "automatic" },
  { label: "Manual", value: "manual" },
];

const Filters = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");
  const [form, setForm] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    const equipment = [];

    if (engine) {
      equipment.push(engine);
    }

    if (transmission) {
      equipment.push(transmission);
    }

    dispatch(
      setFilters({
        location: location.trim(),
        form,
        equipment,
      })
    );

    dispatch(resetVisibleCount());
  };

  const handleClear = () => {
    setLocation("");
    setForm("");
    setEngine("");
    setTransmission("");

    dispatch(clearFilters());
    dispatch(resetVisibleCount());
  };

  return (
    <form className={css.filters} onSubmit={handleSubmit}>
      <label className={css.locationLabel}>
        <span>Location</span>

        <div className={css.locationField}>
          <Map
            className={css.locationIcon}
            size={18}
            strokeWidth={1.8}
          />

          <input
            className={css.input}
            type="text"
            placeholder="City"
            value={location}
            onChange={event => setLocation(event.target.value)}
          />
        </div>
      </label>

      <h2 className={css.title}>Filters</h2>

      <fieldset className={css.group}>
        <legend className={css.legend}>Camper form</legend>

        {formOptions.map(option => (
          <label className={css.radioLabel} key={option.value}>
            <input
              className={css.radio}
              type="radio"
              name="form"
              value={option.value}
              checked={form === option.value}
              onChange={() => setForm(option.value)}
            />

            <span className={css.customRadio} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className={css.group}>
        <legend className={css.legend}>Engine</legend>

        {engineOptions.map(option => (
          <label className={css.radioLabel} key={option.value}>
            <input
              className={css.radio}
              type="radio"
              name="engine"
              value={option.value}
              checked={engine === option.value}
              onChange={() => setEngine(option.value)}
            />

            <span className={css.customRadio} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className={css.group}>
        <legend className={css.legend}>Transmission</legend>

        {transmissionOptions.map(option => (
          <label className={css.radioLabel} key={option.value}>
            <input
              className={css.radio}
              type="radio"
              name="transmission"
              value={option.value}
              checked={transmission === option.value}
              onChange={() => setTransmission(option.value)}
            />

            <span className={css.customRadio} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <button className={css.search} type="submit">
        Search
      </button>

      <button className={css.clear} type="button" onClick={handleClear}>
        <span aria-hidden="true">×</span>
        Clear filters
      </button>
    </form>
  );
};

export default Filters;