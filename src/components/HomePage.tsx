import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../services/mealService";
import { Category } from "../types/types";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import RandomMeal from "./RandomMeal";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Alert } from "@mui/material";

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

  const cardColors = [
    "#FFCDD2",
    "#F8BBD0",
    "#E1BEE7",
    "#D1C4E9",
    "#C5CAE9",
    "#BBDEFB",
    "#B3E5FC",
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom align="center">
        Meal Finder
      </Typography>

      <Box my={4}>
        <SearchBar onSearch={handleSearch} />
        {searchTerm && (
          <Box mt={2}>
            <SearchResults
              searchTerm={searchTerm}
              setSearchError={setSearchError}
            />
            {searchError && (
              <Alert severity="info">No results found for "{searchTerm}"</Alert>
            )}
          </Box>
        )}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box>
            <RandomMeal
              searchTerm={searchTerm}
              onRandomMealFetch={handleRandomMealFetch}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Categories
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Grid container spacing={2}>
                {categories.map((category, index) => (
                  <Grid item xs={12} sm={6} md={4} key={category.strCategory}>
                    <Card
                      component={Link}
                      to={`/category/${category.strCategory}`}
                      sx={{
                        backgroundColor: cardColors[index % cardColors.length],
                        color: "#fff",
                        height: 150,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" align="center">
                          {category.strCategory}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
