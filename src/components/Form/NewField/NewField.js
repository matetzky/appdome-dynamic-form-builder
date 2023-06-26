import React, { useState } from 'react';
import './NewField.css';

const NewField = ({ onAddField, onClose }) => {
  const [fieldType, setFieldType] = useState('text');
  const [fieldName, setFieldName] = useState('');
  const [fieldOptions, setFieldOptions] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);

  const handleFieldTypeChange = (e) => {
    setFieldType(e.target.value);
  };

  const handleFieldNameChange = (e) => {
    setFieldName(e.target.value);
  };

  const handleFieldOptionsChange = (e) => {
    setFieldOptions(e.target.value);
  };

  const handleAddField = () => {
    const newField = {
      type: fieldType,
      name: fieldName,
      options: fieldType === 'dropdown' || fieldType === 'checkbox' ? fieldOptions.split(',') : [],
      value: ''
    };
    onAddField(newField);
    onClose();
  };

  return (
    <div className="new-field-container">
      <h3>New Field Editor</h3>
      <div>
        <label htmlFor="field-type">Field Type:</label>
        <select id="field-type" value={fieldType} onChange={handleFieldTypeChange}>
          <option value="text">Text</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>
      <div>
        <label htmlFor="field-name">Field Name:</label>
        <input type="text" id="field-name" value={fieldName} onChange={handleFieldNameChange} />
      </div>
      <div>
      <label htmlFor="mandatory-checkbox">Is Mandatory:</label>
  <input
    type="checkbox"
    id="mandatory-checkbox"
    checked={isMandatory}
    onChange={(e) => setIsMandatory(e.target.checked)}
  />
      </div>
      {(fieldType === 'dropdown' || fieldType === 'checkbox') && (
        <div>
          <label htmlFor="field-options">Field Options:</label>
          <input type="text" id="field-options" value={fieldOptions} onChange={handleFieldOptionsChange} />
        </div>
      )}
      <button onClick={handleAddField}>Create Field</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default NewField;
