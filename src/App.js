import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//routes and Nav
import LoginPage from "./components/views/loginOrRegister/LoginORegister";
import NavBar from "./components/navigation/NavBar";
import Footer from "./components/navigation/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
