  import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Reservation } from "./models/reservationSchema.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_Admin],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/api/v1/reservation", reservationRouter);

app.get("/getReservations", (req, res) => {
  Reservation.find()
    .then((reservation) => res.json(reservation))
    .catch((err) => res.json(err));
});

app.put("/updateReservations", async (req, res) => {
  const id = req.body.id
  const newFirstName = req.body.newFirstName;
  const newLastName = req.body.newLastName;
  const newEmail = req.body.newEmail;
  const newPhone = req.body.newPhone;
  const newDate = req.body.newDate;
  const newTime = req.body.newTime;
  const new_No_person = req.body.new_No_person;
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      phone: newPhone,
      date: newDate,
      time: newTime,
      no_person: new_No_person,
    }, { new: true });
    res.json(updatedReservation);
  }  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/deleteReservations/:id",async (req,res)=>{
  const id = req.params.id
  await Reservation.findByIdAndDelete(id).exec()
  res.send("Deleted")
})

app.use(errorMiddleware);
export default app;
