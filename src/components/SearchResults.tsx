import { FC, useEffect, useState } from "react";
import { SimpleMeal } from "../types/types";
import { Link } from "react-router-dom";
import { searchMeals } from "../services/mealService";
import { Dispatch, SetStateAction } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Alert,
} from "@mui/material";

interface SearchResultsProps {
  searchTerm: string;
  setSearchError: Dispatch<SetStateAction<string | null>>;
}

const SearchResults: FC<SearchResultsProps> = ({
  searchTerm,
  setSearchError,
}) => {
  const [meals, setMeals] = useState<SimpleMeal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setSearchError(null);

      try {
        const searchResults = await searchMeals(searchTerm);
        if (searchResults && searchResults.length > 0) {
          setMeals(searchResults);
        } else {
          setMeals([]);
        }
      } catch (err) {
        setMeals([]);
        setSearchError("An error occurred while searching");
      }
      setLoading(false);
    };
    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm, setSearchError]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (meals.length === 0) {
    return (
      <Box mt={2}>
        <Alert severity="info">No results found for "{searchTerm}"</Alert>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        Search Results
      </Typography>
      <Grid container spacing={3}>
        {meals.map((meal) => (
          <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
            <Card
              component={Link}
              to={`/meal/${meal.idMeal}`}
              sx={{
                textDecoration: "none",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={meal.strMealThumb}
                alt={meal.strMeal}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {meal.strMeal}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResults;
