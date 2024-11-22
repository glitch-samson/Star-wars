import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


// Predefined character descriptions
const characterDescriptions = {
  "Luke Skywalker": "A Jedi Knight who played a pivotal role in the defeat of the Galactic Empire and the redemption of Darth Vader.",
  "Darth Vader": "Once Anakin Skywalker, a powerful Jedi, he fell to the dark side and became the Sith Lord Darth Vader.",
  "Leia Organa": "A princess of Alderaan, Rebel leader, and twin sister of Luke Skywalker.",
  "Han Solo": "A smuggler turned hero, Han Solo became a general in the Rebel Alliance.",
  "Yoda": "A legendary Jedi Master, wise and powerful, who trained generations of Jedi.",
};

const CharacterInfo = () => {
  const { name } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
        if (!response.ok) throw new Error('Failed to fetch character data');
        const data = await response.json();
        setCharacter(data.results[0]); // Assume the first match is the correct character
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>No character found!</div>;

  const description = characterDescriptions[character.name] || "No description available for this character.";

  return (
    <div className="character-info">
      <div className="character-card">
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${character.url.split('/')[5]}.jpg`}
          alt={character.name}
          className="character-image"
        />
        <div className="character-details">
          <h1>{character.name}</h1>
          <p><strong>Height:</strong> {character.height} cm</p>
          <p><strong>Mass:</strong> {character.mass} kg</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Birth Year:</strong> {character.birth_year}</p>
          <p className="character-description"><strong>Description:</strong> {description}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
