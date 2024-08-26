import axios from 'axios';
import { CategoriesResponse, MealsResponse, DetailedMeal, SimpleMeal } from '../types/types';


const API_URL= 'https://www.themealdb.com/api/json/v1/1';

export const fetchCategories= async(): Promise<CategoriesResponse> => {
    const response = await axios.get(`${API_URL}/list.php?c=list`);
    return response.data;
};

export const fetchMealsByCategory= async(category: string) : Promise<MealsResponse> => {
    const response = await axios.get(`${API_URL}/filter.php?c=${category}`);
    return response.data;
};

export const fetchMealDetails= async(idMeal: string) : Promise<DetailedMeal> => {
    const response = await axios.get(`${API_URL}/lookup.php?i=${idMeal}`);
    const meal = response.data.meals[0];
    return meal;
};

export const fetchRandomMeal= async() : Promise<DetailedMeal> => {
    const response = await axios.get(`${API_URL}/random.php`);
    const meal = response.data.meals[0];
    return meal;
};

export const searchMeals= async(searchTerm: string) : Promise<SimpleMeal[] | null> => {
    const response = await axios.get(`${API_URL}/search.php?s=${encodeURIComponent(searchTerm)}`); //encodeURIComponent() is used to encode special characters in a string so they can be safely included in a URL as a query parameter.
    //check if the API returns any results
    const meals = response.data.meals; //it will be null if no matching results are found
    return meals;
}



