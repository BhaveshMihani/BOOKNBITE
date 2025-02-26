import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-hot-toast";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [newFirstName, setnewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [new_No_person, setNew_No_person] = useState("");

  useEffect(() => {
    axios
      .get("http://<your-ec2-public-ip>:4000/getReservations")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEditClick = (rowIndex) => {
    setEditingRow(rowIndex);
  };

  const handleCancelClick = () => {
    setEditingRow(null);
  };

  const handleUpdateClick = (id) => {
    const updatedData = {
      id,
      newFirstName,
      newLastName,
      newEmail,
      newPhone,
      newDate,
      newTime,
      new_No_person,
    };

    const filteredData = Object.fromEntries(
      Object.entries(updatedData).filter((entry) => entry[1] !== "")
    );

    axios
      .put("http://<your-ec2-public-ip>:4000/updateReservations", filteredData)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, ...response.data } : user
        );
        setUsers(updatedUsers);
        setEditingRow(null);
        toast.success("Updated Reservation Successfully");
      })
      .catch((error) => {
        console.error("Error updating reservation:", error);
      });

    setEditingRow(null);
    location.reload();
  };

  const handleDeleteClick = (id) => {
    axios.delete(`http://51.21.222.251:4000/deleteReservations/${id}`);
    toast.success("Reservation Deleted Successfully");
    location.reload();
  };

  return (
    <div className="container-fluid mt-5 w-400">
      <div className="container vh-100 p-3 mb-5 bg-body rounded">
        <div className="full-width">
          <h1 className="card-title text-center pb-3">CURRENT RESERVATIONS</h1>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>No. of Persons</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={!newFirstName ? user.firstName : newFirstName}
                        onChange={(event) =>
                          setnewFirstName(event.target.value)
                        }
                      />
                    ) : (
                      user.firstName
                    )}
                  </td>
                  <td>
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={!newLastName ? user.lastName : newLastName}
                        onChange={(event) => setNewLastName(event.target.value)}
                      />
                    ) : (
                      user.lastName
                    )}
                  </td>
                  <td>
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={!newDate ? user.date : newDate}
                        onChange={(event) => setNewDate(event.target.value)}
                      />
                    ) : (
                      user.date
                    )}
                  </td>
                  <td>
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={!newTime ? user.time : newTime}
                        onChange={(event) => setNewTime(event.target.value)}
                      />
                    ) : (
                      user.time
                    )}
                  </td>
                  <td>
                    {editingRow === index ? (
                      <input
                        type="number"
                        value={!new_No_person ? user.no_person : new_No_person}
                        onChange={(event) =>
                          setNew_No_person(event.target.value)
                        }
                      />
                    ) : (
                      user.no_person
                    )}
                  </td>
                  <td>
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={!newEmail ? user.email : newEmail}
                        onChange={(event) => setNewEmail(event.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={!newPhone ? user.phone : newPhone}
                        onChange={(event) => setNewPhone(event.target.value)}
                      />
                    ) : (
                      user.phone
                    )}
                  </td>
                  <td className="d-flex justify-content-center">
                    {editingRow === index ? (
                      <>
                        <button
                          className="btn btn-primary mx-2"
                          onClick={() => handleUpdateClick(user._id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-secondary mx-2"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary mx-2"
                          onClick={() => handleEditClick(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleDeleteClick(user._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
