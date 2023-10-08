import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import Header from './components/Header';
import Reserve from './components/Reserve';
import ReservationForm from './components/ReservationForm';
import Home from './components/Home';
import Doctors from './components/Doctors';
import Doctor from './components/Doctor';
import './App.css';
import SignUp from './components/auth_pages/Signup';
import Login from './components/auth_pages/Login';
import MyReservations from './components/MyReservation';
import AddDoctor from './components/AddDoctor';
import DeleteDoctor from './components/DeleteDoctor';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/header" element={<Header />} />
      <Route path="/Reserve" element={<Reserve />} />
      <Route path="/Reservation" element={<ReservationForm />} />
      <Route path="/Appointments" element={<MyReservations />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:doctorId" element={<Doctor />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/Adddoctor" element={<AddDoctor />} />
      <Route path="/Deletedoctor" element={<DeleteDoctor />} />
      <Route path="/log_in" element={<Login />} />
    </>,
  ),
);

function App() {
  return (
    <main className="App">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
