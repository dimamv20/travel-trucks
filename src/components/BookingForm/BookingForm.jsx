import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";

import css from "./BookingForm.module.css";

const bookingSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .required("Please enter your name."),

  email: yup
    .string()
    .trim()
    .email("Please enter a valid email.")
    .required("Please enter your email."),
});

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = () => {
    toast.success("Your campervan has been successfully booked!");
    reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={css.title}>Book your campervan now</h2>

      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={css.field}>
        <label className={css.label} htmlFor="booking-name">
          Name*
        </label>

        <input
          id="booking-name"
          className={`${css.input} ${errors.name ? css.inputError : ""}`}
          type="text"
          placeholder="Name*"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />

        {errors.name && (
          <p className={css.errorMessage}>{errors.name.message}</p>
        )}
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="booking-email">
          Email*
        </label>

        <input
          id="booking-email"
          className={`${css.input} ${errors.email ? css.inputError : ""}`}
          type="email"
          placeholder="Email*"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />

        {errors.email && (
          <p className={css.errorMessage}>{errors.email.message}</p>
        )}
      </div>

      <button className={css.button} type="submit">
        Send
      </button>
    </form>
  );
};

export default BookingForm;