import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddDoctor } from '../redux/doctorSlice';

const NewDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    time_available_from: '',
    time_available_to: '',
    bio: '',
    fee_per_appointment: '',
    specialization_id: '',
    image: '',
    location: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !newDoctor.name
      || !newDoctor.time_available_from
      || !newDoctor.time_available_to
      || !newDoctor.bio
      || !newDoctor.fee_per_appointment
      || !newDoctor.specialization_id
      || !newDoctor.image
      || !newDoctor.location
    ) {
      setError('All fields are mandatory');
    }

    const data = {
      name: newDoctor.name,
      time_available_from: newDoctor.time_available_from,
      time_available_to: newDoctor.time_available_to,
      bio: newDoctor.bio,
      fee_per_appointment: newDoctor.fee_per_appointment,
      specialization_id: newDoctor.specialization_id,
      image: newDoctor.image,
      lacation: newDoctor.location,
    };

    dispatch(AddDoctor(data));
    setNewDoctor({
      name: '',
      time_available_from: '',
      time_available_to: '',
      bio: '',
      fee_per_appointment: '',
      specialization_id: '',
      image: '',
      location: '',
    });
    setSuccess('Doctor added successfully.');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({
      ...newDoctor,
      [name]: value,
    });
  };

  return (
    <div>
      {success && <div>{success}</div>}
      {error && <div>{error}</div>}
      <h1>Add New Doctor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newDoctor.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="time_available_from"
            placeholder="time_available_from"
            value={newDoctor.time_available_from}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="time_available_to"
            placeholder="time_available_to"
            value={newDoctor.time_available_to}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="bio"
            placeholder="bio"
            value={newDoctor.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="fee_per_appointment"
            placeholder="fee_per_appointment"
            value={newDoctor.fee_per_appointment}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="specialization_id"
            placeholder="Specialization"
            value={newDoctor.specialization_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newDoctor.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location(city)"
            value={newDoctor.location}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default NewDoctor;
