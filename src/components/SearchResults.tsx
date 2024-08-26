import { FC, useEffect, useState } from "react";
import { SimpleMeal } from "../types/types";
import { Link } from "react-router-dom";
import { searchMeals } from "../services/mealService";
import { Dispatch, SetStateAction } from "react";

interface SearchResultsProps {
  searchTerm: string;
  setSearchError: Dispatch<SetStateAction<string | null>>;
}

const SearchResults: FC<SearchResultsProps> = ({
  searchTerm,
  setSearchError,
}) => {
  const [meals, setMeals] = useState<SimpleMeal[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);

      setSearchError(null);
      try {
        const searchResults = await searchMeals(searchTerm);
        if (searchResults) {
          setMeals(searchResults);
        } else {
          setMeals(null);
          setSearchError("No results found S");
        }
      } catch (err) {
        setSearchError("An error occurred while searching");
      }
      setLoading(false);
    };
    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm, setSearchError]);

  if (loading) {
    return <p>loading..</p>;
  }

  if (meals === null || meals.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Search Results</h2>
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
    </div>
  );
};

export default SearchResults;
