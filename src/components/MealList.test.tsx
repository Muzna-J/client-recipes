import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MealList from "./MealList";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("MealList Component", () => {
  it("renders a list of meals", async () => {
    const meals = [
      { idMeal: "1", strMeal: "Meal 1" },
      { idMeal: "2", strMeal: "Meal 2" },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: { meals } });

    render(<MealList />);

    expect(await screen.findByText("Meal 1")).toBeInTheDocument();
    expect(await screen.findByText("Meal 2")).toBeInTheDocument();
  });

  it("renders no meals when API returns empty list", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { meals: [] } });

    render(<MealList />);

    expect(screen.queryByText("Meal 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Meal 2")).not.toBeInTheDocument();
  });
});
