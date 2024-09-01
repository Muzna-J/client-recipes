import { FC, useEffect, useState } from "react";
import { fetchRandomMeal } from "../services/mealService";
import { DetailedMeal, RandomMealProps } from "../types/types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Alert } from "@mui/material";

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
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Feeling lucky?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchRandomMeal}
        >
          Get a random meal
        </Button>
      </CardContent>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!clearMeal && meal && (
        <>
          <CardMedia
            component="img"
            image={meal.strMealThumb}
            alt={meal.strMeal}
            sx={{ height: 200, objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h6" align="center">
              {meal.strMeal}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              component={Link}
              to={`/meal/${meal.idMeal}`}
              fullWidth
            >
              View Recipe
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default RandomMeal;
