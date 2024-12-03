import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time, no_person } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !date ||
    !time ||
    !no_person
  ) {
    return next(new ErrorHandler("Please fill full Reservation Form!", 400));
  }
  try {
    const newReservation = new Reservation({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      no_person,
    });
    await newReservation.save(); // Use save() to create and save the document

    res.status(200).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(" , "), 400));
    }
    return next(error);
  }
};
