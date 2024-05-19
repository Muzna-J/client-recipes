import { useState, useEffect } from "react";
import axios from "axios";

interface Meal {
  idMeal: string;
  strMeal: string;
}

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        setMeals(response.data.meals);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div>
      <h1>Meal List</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;
