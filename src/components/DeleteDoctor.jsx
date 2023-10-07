import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteDoctor } from "./redux/doctorSlice";
import "../css/deletedoctors.css";

const DeleteDoctor = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctors);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch doctors for the logged-in user from your API
    // For example, fetch doctors associated with the user's ID
    fetch(`http://localhost:3000/api/v1/doctors/:doctor_id`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Ensure data is an array before storing it in state
          dispatch({ type: "doctor/addDoctors", payload: data });
        } else {
          console.error("Doctors data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, [dispatch]);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/doctors/${doctorId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to delete doctor");
      } else {
        // Remove the deleted doctor from the Redux store
        dispatch(deleteDoctor(doctorId));

        // Show a success message using toast
        toast.success("Doctor deleted successfully!");
      }
    } catch (error) {
      setError("Error deleting doctor. Please try again.");
    }
  };

  return (
    <div className="delete-doctor-container">
      <h2>Delete Doctor</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="doctor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Available From</th>
            <th>Available To</th>
            <th>Specialization</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.time_available_from}</td>
              <td>{doctor.time_available_to}</td>
              <td>{doctor.specialization_id}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteDoctor(doctor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteDoctor;
