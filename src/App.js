/* eslint-disable */
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Header from "./components/Header";
import Reserve from "./components/Reserve";
import ReservationForm from "./components/ReservationForm";
import Home from './components/Home';
import Doctors from './components/Doctors';
import Doctor from './components/Doctor';
import './App.css'
import SignUp from "./components/auth_pages/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/header" element={<Header />} />
      <Route path="Reserve" element={<Reserve />} />
      <Route path="Reservation" element={<ReservationForm />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:doctorId" element={<Doctor />} />
      <Route path="/Signup" element={<SignUp />} />
    </>
  )
);

function App() {
  return (
    <main className="App">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
