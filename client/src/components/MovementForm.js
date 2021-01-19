import React from "react";
import { useForm } from "react-hook-form";

const MovementForm = (props) => {
  const { register, handleSubmit, formState } = useForm({ mode: "onBlur" });
  const { setMovements } = props;

  const onSubmit = (data) => {
    const formatted = {
      // TODO: proper ID generation
      id: 4324242352,
      origin: {
        lat: data["originLat"],
        lng: data["originLng"],
      },
      destination: {
        lat: data["destinationLat"],
        lng: data["destinationLng"],
      },
      description: data.description,
    };

    setMovements((prevState) => {
      return [...prevState, formatted];
    });
  };

  /** Generate a form input that takes a coordinate in the range [-90, 90] */
  const createCoordinateInput = (name, label) => {
    return (
      <label className={formState.errors[name] && "font-bold"}>
        <span>{label}</span>
        <input
          className={formState.errors[name] && "bg-red-200"}
          type="number"
          name={name}
          ref={register({
            required: true,
            valueAsNumber: true,
            validate: (x) =>
              (x >= -90 && x <= 90) ||
              "Must be a number in the range [-90, 90]",
          })}
        />
      </label>
    );
  };

  // TODO: render error messages on the form (e.g. "This field is required")
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* coordinates section */}
      <fieldset className="flex justify-between">
        {/* originating coordinates */}
        <fieldset>
          <legend>Originating Coordinates:</legend>
          {createCoordinateInput("originLat", "Latitude")}
          {createCoordinateInput("originLng", "Longitude")}
        </fieldset>

        {/* destination coordinates */}
        <fieldset>
          <legend>Desintation Coordinates:</legend>
          {createCoordinateInput("destinationLat", "Latitude")}
          {createCoordinateInput("destinationLng", "Longitude")}
        </fieldset>
      </fieldset>

      {/* movement description */}
      <label>
        <span>Description:</span>
        <input type="text" name="description" ref={register} />
      </label>

      {/* submission */}
      <input type="submit" />
      {!formState.isValid && formState.isSubmitted && (
        <p>Please fix all errors and resubmit.</p>
      )}
    </form>
  );
};

export default MovementForm;