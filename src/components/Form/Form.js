import { React, useState } from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import NewField from "./NewField/NewField";

import "./Form.css";

const Form = ({ form, updateCurrentFormFields, handleClose }) => {
  const [fields, setFields] = useState([]);
  const [showNewField, setShowNewField] = useState(false);

  ///////////////////////////////////////////////////////////
  
  const handleSubmit = () => {
    updateCurrentFormFields(fields);
    }

  ///////////////////////////////////////////////////////////
  const handleAddField = (fieldData) => {
    setFields([...fields, fieldData]);
    console.log('amit:', fields);
  };
  ///////////////////////////////////////////////////////////
  const handleDeleteField = (index) =>
    setFields(fields.filter((_, i) => i !== index));
  ///////////////////////////////////////////////////////////
  const renderFields = () => {
    return fields.map((field, index) => {
      let fieldElement = null;

      switch (field.type) {

        /* Text */
        case "text":
          fieldElement = (
            <div>
              <label htmlFor={`field-${index}`} className="field-title">
                {field.name}:
                </label>
              <span>
                <span className="mandatory-indicator">*</span>
              </span>
              <input
                type="text"
                id={`field-${index}`}
                placeholder={field.name}
                onChange={(e)=>{field.value=e.target.value}}
              />
            </div>
          );
          break;

          {
            /* Dropdown */
          }
        case "dropdown":
          fieldElement = (
            <div>
              <label htmlFor={`field-${index}`} className="field-title">
                {field.name}:
                </label>
              <select id={`field-${index}`} onChange={(e)=>{field.value=e.target.value}}>
                <option disabled selected value="">
                  {field.name}
                </option>
                <span>
                  <span className="mandatory-indicator">*</span>
                </span>
                {field.options.map((option, optionIndex) => (
                  <option value={option} key={optionIndex}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
          break;

          {
            /* Checkbox */
          }
        case "checkbox":
          fieldElement = (
            <div>
              <span className="field-title">
                {field.name}
                <span className="mandatory-indicator">*</span>
              </span>
              {field.options.map((option, index) => (
                <div key={index}>
                  <label>
                    <input type="checkbox" checked={option.isMandatory} onChange={(e)=>{field.value=e.target.value}}/>
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          );
          break;
        default:
          fieldElement = null;
      }

      return (
        <div className="field-item" key={index}>
          {fieldElement}
          <span
            className="delete-icon"
            onClick={() => handleDeleteField(index)}
          >
            <FontAwesomeIcon
              className="form-delete-icon"
              icon={faTrash}
              onClick={() => handleDeleteField(index)}
            />
            <i className="fa fa-trash" aria-hidden="true"></i>
          </span>
        </div>
      );
    });
  };

  ///////////////////////////////////////////////////////////
  const handleToggleNewField = () => {
    setShowNewField(!showNewField);
  };
  ///////////////////////////////////////////////////////////

  return (
    <Draggable handle=".form-toolbar">
      <div className="form-popup">
        <div className="form-toolbar">
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          <p className="form-toolbar-header">New Form Editor</p>
        </div>
        <div className="form-content">
          <h2>{form.name}</h2>
          <ul>
            <div className="form-fields">
              <p>Fields:</p>
              {renderFields()}
            </div>
          </ul>

          {/* Add New Field '+' button */}
          <ul>
            <button
              onClick={handleToggleNewField}
              onClose={handleToggleNewField}
            >
              Add New Field
              <FontAwesomeIcon
                icon={faCirclePlus}
                className="create-new-form-icon"
              />
            </button>
          </ul>

          {/* Launch New Field Editor */}
          {showNewField && (
            <NewField
              onAddField={handleAddField}
              onClose={handleToggleNewField}
            />
          )}
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Draggable>
  );
};

export default Form;
