import { Link } from "react-router-dom";

import heroBg from "../../assets/images/hero-bg.jpg";

import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section
      className={css.hero}
      style={{
        backgroundImage: `linear-gradient(
          rgba(16, 24, 40, 0.45),
          rgba(16, 24, 40, 0.45)
        ), url(${heroBg})`,
      }}
    >
      <div className={css.container}>
        <h1 className={css.title}>Campers of your dreams</h1>

        <p className={css.text}>
          You can find everything you want in our catalog
        </p>

        <Link className={css.button} to="/catalog">
          View Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;