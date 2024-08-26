import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailedMeal } from "../types/types";
import { fetchMealDetails } from "../services/mealService";

const MealDetails: FC = () => {
  const { idMeal } = useParams<{ idMeal: string }>();
  const [meal, setMeal] = useState<DetailedMeal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        if (idMeal) {
          const mealDetails = await fetchMealDetails(idMeal);
          setMeal(mealDetails);
        } else {
          setError("Meal ID is missing");
        }
      } catch (err) {
        setError("Failed to fetch meal details");
      }
      setLoading(false);
    };
    loadDetails();
  }, [idMeal]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {meal && (
        <div>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea}
          </p>
          <p>
            <strong>Instructions:</strong>
          </p>
          <p>{meal.strInstructions}</p>
          <h3>Ingredients</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
              const ingredient =
                meal[`strIngredient${i}` as keyof DetailedMeal];
              const measure = meal[`strMeasure${i}` as keyof DetailedMeal];
              return ingredient && measure ? (
                <li key={i}>
                  {ingredient} - {measure}
                </li>
              ) : null;
            })}
          </ul>
          {meal.strYoutube && (
            <div>
              <h3>Video Instructions</h3>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MealDetails;
