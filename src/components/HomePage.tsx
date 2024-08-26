import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../services/mealService";
import { Category } from "../types/types";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import RandomMeal from "./RandomMeal";

const HomePage: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCategories();
        console.log(data);
        setCategories(data.meals);
      } catch (err) {
        setError("Failed to load categories");
      }
      setLoading(false);
    };
    loadCategories();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchError(null);
  };

  const handleRandomMealFetch = () => {
    setSearchError(null);
  };

  return (
    <div>
      <h1>Meal Finder</h1>
      <SearchBar onSearch={handleSearch} />

      <div>
        <h2>Categories</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <ul>
            {categories.map((category) => (
              <li key={category.strCategory}>
                <Link to={`/category/${category.strCategory}`}>
                  {category.strCategory}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <RandomMeal
        searchTerm={searchTerm}
        onRandomMealFetch={handleRandomMealFetch}
      />

      {searchTerm && (
        <SearchResults
          searchTerm={searchTerm}
          setSearchError={setSearchError}
        />
      )}
      {searchError && <p>{searchError}</p>}
    </div>
  );
};

export default HomePage;
