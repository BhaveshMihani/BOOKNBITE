import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "First Name must contain at least 3 Characters"],
    maxlength: [30, "First Name can contain 30 Characters at Max"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "Last Name must contain at least 3 Characters"],
    maxlength: [30, "Last Name can contain 30 Characters at Max"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide a valid Email"],
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, "Phone must 10 Digits"],
    maxlength: [10, "Phone must 10 Digits"],
  },
  time: {
    type: String,
    required: true,
    // Add validation for time format if needed
  },
  date: {
    type: String,
    required: true,
    // Add validation for date format if needed
  },
  no_person: {
    type: Number,
    required: true,
    minlength: [2, "Book for minimum 2 persons"],
    maxlength: [9, "Book for maximum 9 persons"],
    // Add validation for date format if needed
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
