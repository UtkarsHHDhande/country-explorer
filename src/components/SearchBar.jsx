import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length > 1) {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${value}`);
        const data = await response.json();
        setSuggestions(data.slice(0, 5));
      } catch (error) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCountry = (countryName) => {
    navigate(`/country/${countryName}`);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search countries..."
        className="w-64 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border rounded-lg shadow-lg">
          {suggestions.map((country) => (
            <li
              key={country.cca3}
              onClick={() => handleSelectCountry(country.name.common)}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
