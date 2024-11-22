import React from 'react';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <h2>{character.name}</h2>
      <p><strong>Height:</strong> {character.height} cm</p>
      <p><strong>Mass:</strong> {character.mass} kg</p>
      <p><strong>Gender:</strong> {character.gender}</p>
    </div>
  );
};

export default CharacterCard;
