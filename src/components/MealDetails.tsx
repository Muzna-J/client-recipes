import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailedMeal } from "../types/types";
import { fetchMealDetails } from "../services/mealService";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
} from "@mui/material";
import { Alert } from "@mui/material";

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      {meal && (
        <Card>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                alt={meal.strMeal}
                image={meal.strMealThumb}
                title={meal.strMeal}
                sx={{ height: "100%", objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {meal.strMeal}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Category:</strong> {meal.strCategory}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Area:</strong> {meal.strArea}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Instructions
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  sx={{ lineHeight: 1.6, textAlign: "justify", mb: 2 }}
                >
                  {meal.strInstructions}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Ingredients
                </Typography>
                <ul>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                    const ingredient =
                      meal[`strIngredient${i}` as keyof DetailedMeal];
                    const measure =
                      meal[`strMeasure${i}` as keyof DetailedMeal];
                    return ingredient && measure ? (
                      <li key={i}>
                        <Typography variant="body2">
                          {ingredient} - {measure}
                        </Typography>
                      </li>
                    ) : null;
                  })}
                </ul>
                {meal.strYoutube && (
                  <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                      Video Instructions
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      href={meal.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch on YouTube
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
};

export default MealDetails;
