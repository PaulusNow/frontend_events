import AdminPage from "./components/AdminPage";
import EventDetails from "./components/EventDetails";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UpdateUser from "./components/UpdateUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/home" 
          element={
            <>
              <Navbar />
              <Home />
            </>
          } 
        />
        <Route 
          path="/events" 
          element={
            <>
              <Navbar />
              <EventDetails />
            </>
          } 
        />
        <Route 
          path="/update/:id" 
          element={
            <>
              <Navbar />
              <UpdateUser />
            </>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <>
              <Navbar />
              <AdminPage />
            </>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
