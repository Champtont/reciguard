import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//routes and Nav
import LoginPage from "./components/views/loginOrRegister/LoginORegister";
import NavBar from "./components/navigation/NavBar";
import Footer from "./components/navigation/Footer";
import MyCalendar from "./components/views/myCalendar/MyCalendar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/myCalendar" element={<MyCalendar />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
