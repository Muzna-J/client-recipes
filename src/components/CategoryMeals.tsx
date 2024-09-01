import { FC, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SimpleMeal } from "../types/types";
import { fetchMealsByCategory } from "../services/mealService";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";

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
      } catch (error) {
        setError("Failed to fetch meals for this category");
      }
      setLoading(false);
    };
    loadMeals();
  }, [categoryName]);

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

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">
        Meals in {categoryName} Category
      </Typography>
      {meals && (
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
      )}
    </Container>
  );
};

export default CategoryMeals;
