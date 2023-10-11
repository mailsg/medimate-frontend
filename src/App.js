import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import Reserve from './components/Reserve';
import Doctors from './components/Doctors';
import Doctor from './components/Doctor';
import './App.css';
import SignUp from './components/auth_pages/Signup';
import Login from './components/auth_pages/Login';
import MyReservations from './components/MyReservations';
import AddDoctor from './components/AddDoctor';
import DeleteDoctor from './components/DeleteDoctor';
import Root from './components/Root';
import ReservationForm from './components/ReservationForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Doctors />} />
        <Route path="/add" element={<AddDoctor />} />
        <Route path="/doctors/:doctorId" element={<Doctor />} />
        <Route path="/delete" element={<DeleteDoctor />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/reservations" element={<MyReservations />} />
      </Route>
      <Route path="/log_in" element={<Login />} />
      <Route path="/sign_up" element={<SignUp />} />
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
