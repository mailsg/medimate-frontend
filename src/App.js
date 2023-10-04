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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Header />} />
      <Route path="Reserve" element={<Reserve />} />  
      <Route path="Reservation" element={<ReservationForm />} />  
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
