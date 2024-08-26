import { FC, useEffect, useState } from "react";
import { fetchRandomMeal } from "../services/mealService";
import { DetailedMeal, RandomMealProps } from "../types/types";
import { Link } from "react-router-dom";

const RandomMeal: FC<RandomMealProps> = ({ searchTerm, onRandomMealFetch }) => {
  const [meal, setMeal] = useState<DetailedMeal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clearMeal, setClearMeal] = useState(false);

  const handleFetchRandomMeal = async () => {
    setLoading(true);
    setError(null);
    onRandomMealFetch();

    try {
      const randomMeal = await fetchRandomMeal();
      setMeal(randomMeal);
      setClearMeal(false);
    } catch (err) {
      setError("Failed to fetch a random meal");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) {
      setClearMeal(true);
    }
  }, [searchTerm]);

  return (
    <div>
      <h2>Feeling lucky?</h2>
      <button onClick={handleFetchRandomMeal}>Get a random meal</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!clearMeal && meal && (
        <div>
          <Link to={`/meal/${meal.idMeal}`}>
            <h3>{meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default RandomMeal;
