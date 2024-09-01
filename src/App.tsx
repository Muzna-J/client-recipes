import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FC } from "react";
import HomePage from "./components/HomePage";
import CategoryMeals from "./components/CategoryMeals";
import MealDetails from "./components/MealDetails";
import Navbar from "./components/Navbar";
import { Container, CssBaseline } from "@mui/material";

const App: FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container sx={{ mt: 4, pb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meal/:idMeal" element={<MealDetails />} />
          <Route path="/category/:categoryName" element={<CategoryMeals />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
