import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Reserve from './components/Reserve';
import ReservationForm from './components/ReservationForm';
import Home from './components/Home';
import Doctors from './components/Doctors';
import Doctor from './components/Doctor';
import './App.css';
import SignUp from './components/auth_pages/Signup';
import Login from './components/auth_pages/Login';
import MyReservations from './components/MyReservations';
import AddDoctor from './components/AddDoctor';
import DeleteDoctor from './components/DeleteDoctor';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/header" element={<Header />} />
      <Route path="/home/Reserve" element={<Reserve />} />
      <Route path="/home/Adddoctor" element={<AddDoctor />} />
      <Route path="/home/Deletedoctor" element={<DeleteDoctor />} />
      <Route path="/home/Myreservations" element={<MyReservations />} />
      <Route path="Reservation" element={<ReservationForm />} />
      <Route path="/home/doctors" element={<Doctors />} />
      <Route path="/doctors/:doctorId" element={<Doctor />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/Adddoctor" element={<AddDoctor />} />
      <Route path="/Deletedoctor" element={<DeleteDoctor />} />
    </>,
  ),
);

function App() {
  return (
    <main className="App">
      <RouterProvider router={router} />
      {/* <ToastContainer /> */}
    </main>
  );
}

export default App;
