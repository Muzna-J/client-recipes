import { useState } from "react";
import { FC } from "react";

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
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a meal or ingredient"
      />
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
