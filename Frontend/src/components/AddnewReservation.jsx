import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddnewReservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(0);
  const [no_person, setNo_person] = useState("");

  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://51.21.222.251:4000/api/v1/reservation/send",
        { firstName, lastName, email, phone, date, time, no_person },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setDate("");
      setTime("");
      setPhone(0);
      setNo_person(0);
      location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h2 className="card-title text-center pb-3">ADD A RESERVATION</h2>
      <div className="card shadow p-3 mb-5 bg-body rounded">
        <div className="card-body">
          <form onSubmit={handleReservation}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">No of Persons</label>
                  <input
                    type="number"
                    className="form-control"
                    value={no_person}
                    onChange={(e) => setNo_person(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Reserve Now
              <span>
                <HiOutlineArrowNarrowRight />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddnewReservation;
