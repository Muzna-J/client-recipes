import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FC } from "react";
import HomePage from "./components/HomePage";
import CategoryMeals from "./components/CategoryMeals";
import MealDetails from "./components/MealDetails";
import Navbar from "./components/Navbar";

const App: FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal/:idMeal" element={<MealDetails />} />
        <Route path="/category/:categoryName" element={<CategoryMeals />} />
      </Routes>
    </Router>
  );
};

export default App;
