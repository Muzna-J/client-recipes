import { FC, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SimpleMeal } from "../types/types";
import { fetchMealsByCategory } from "../services/mealService";

const CategoryMeals: FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [meals, setMeals] = useState<SimpleMeal[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        if (categoryName) {
          const mealsData = await fetchMealsByCategory(categoryName);
          setMeals(mealsData.meals);
        } else {
          setError("Category name is not available");
        }
      } catch (err) {
        setError("Failed to fetch meals for this category");
      }
      setLoading(false);
    };
    loadMeals();
  }, [categoryName]);

  return (
    <div>
      <h2>Meals in {categoryName} Category</h2>
      {loading && <p>Loading..</p>}
      {error && <p>{error}</p>}
      {meals && (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal}>
              <Link to={`/meal/${meal.idMeal}`}>
                <h3>{meal.strMeal}</h3>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryMeals;
