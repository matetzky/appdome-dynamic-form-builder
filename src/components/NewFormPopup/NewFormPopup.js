import React, { useState } from 'react';
import './NewFormPopup.css'

const NewFormPopup = ({ handleNewFormSubmit }) => {
  const [newFormName, setNewFormName] = useState('');

  const handleFormSubmit = () => {
    if (newFormName.trim() === '') {
      return;
    }

    handleNewFormSubmit(newFormName.trim());
    setNewFormName('');
  };

  return (
    <div className="new-form-popup-container">
      <input
        type="text"
        placeholder="Form Name"
        value={newFormName}
        onChange={(e) => setNewFormName(e.target.value)}
      />
      <button onClick={handleFormSubmit} className="create-button">Create</button>
    </div>
  );
};

export default NewFormPopup;
