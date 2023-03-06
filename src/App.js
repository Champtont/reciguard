import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
//routes and Nav
import LoginPage from "./components/views/loginOrRegister/LoginORegister";
import NavBar from "./components/navigation/NavBar";
import Footer from "./components/navigation/Footer";
import MyCalendar from "./components/views/myCalendar/MyCalendar";
import HomePage from "./components/views/main/HomePage";
import MyProfile from "./components/views/myProfile/MyProfile";
import SingleRecipePage from "./components/views/Recipes/SingleRecipePage";
import MyShoppingList from "./components/views/myShoppingList/MyShoppingList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/:key" element={<HomePage />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/recipe/:recipeId" element={<SingleRecipePage />} />
          <Route path="/myCalendar" element={<MyCalendar />} />
          <Route path="/myShoppingList" element={<MyShoppingList />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
