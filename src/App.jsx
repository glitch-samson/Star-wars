import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all characters
    const fetchCharacters = async () => {
      const results = [];
      for (let i = 1; i <= 9; i++) {
        const response = await fetch(`https://swapi.dev/api/people/?page=${i}`);
        const data = await response.json();
        results.push(...data.results);
      }
      setCharacters(results);
    };
    fetchCharacters();
  }, []);

  const handleSearch = (characterName) => {
    const selectedCharacter = characters.find((char) => char.name === characterName);
    if (selectedCharacter) {
      navigate(`/character/${encodeURIComponent(characterName)}`);
    }
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredCharacters([]);
    } else {
      const filtered = characters.filter((char) =>
        char.name.toLowerCase().startsWith(term.toLowerCase())
      );
      setFilteredCharacters(filtered.slice(0, 5)); // Limit dropdown to 5 suggestions
    }
  };

  return (
    <div className="App">
      <div className="overlay">
        <h1 className="title">Star Wars Universe</h1>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for a character..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-bar"
        />
        {/* Dropdown */}
        {filteredCharacters.length > 0 && (
          <ul className="dropdown">
            {filteredCharacters.map((char) => (
              <li
                key={char.name}
                onClick={() => handleSearch(char.name)}
                className="dropdown-item"
              >
                {char.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
