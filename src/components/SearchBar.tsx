import { useState } from "react";
import { FC } from "react";
import { TextField, Button, Box } from "@mui/material";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a meal or ingredient"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearchSubmit}
        sx={{ height: "56px" }}
      >
        Search
      </Button>
    </Box>
  );
};
export default SearchBar;
