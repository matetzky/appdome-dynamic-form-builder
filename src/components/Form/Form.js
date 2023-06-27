import { React, useState } from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import NewField from "./NewField/NewField";

import "./Form.css";

const Form = ({ form, updateCurrentFormFields, handleClose }) => {
  const [fields, setFields] = useState([...form?.fields]);
  const [showNewField, setShowNewField] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);


  function checkMandatoryFields(fields) {
    console.log('boom', fields)
    for (let i = 0; i < fields?.length; i++) {
      const field = fields[i];
      if (field.isMandatory && (field.value === "")) {
        return false;
      };
    }
    return true;
  }
  const validateForm = () => {
    {
      /* First Validation -> No empty Mandotry Fields */
    }
    return checkMandatoryFields(fields);
    {
      /* More Validation Should be added here... */
    }
  };
  const handleSubmit = () => {
    
    if (validateForm) {
      updateCurrentFormFields(fields);
      handleClose();
    }
    else {
      setFormIsValid(false);
    }
  };

  
  const handleAddField = (fieldData) => {
    setFields([...fields, fieldData]);
  };
  const handleDeleteField = (index) =>
    setFields(fields?.filter((_, i) => i !== index));
  
  const renderFields = () => {
    const filterNonEmptyFields = fields?.filter((field) => field.length !== 0);
    return filterNonEmptyFields?.map((field, index) => {
      let fieldElement = null;

      switch (field.type) {
        /* Text */
        case "text":
          fieldElement = (
            <div className="field-container">
              {/* Fields Title */}
              <label htmlFor={`field-${index}`} className="field-title">
                {field?.name}
                {field?.isMandatory && (
                  <span className="mandatory-indicator">*</span>
                )}
                :
              </label>

              {/* Text Input */}
              <input
                type="text"
                id={`field-${index}`}
                placeholder={field.name}
                onChange={(e) => {
                  field.value = e.target.value;
                }}
              />
            </div>
          );
          break;

          {
            /* Dropdown */
          }
        case "dropdown":
          fieldElement = (
            <div className="field-container">
              <label className="field-title" htmlFor={`field-${index}`}>
                {field.name}:
              </label>
              <select
                id={`field-${index}`}
                onChange={(e) => {
                  field.value = e.target.value;
                }}
              >
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
            <div className="form-container">
              <span className="field-title">
                {field.name}
                <span className="mandatory-indicator">*</span>
              </span>
              {field.options.map((option, index) => {
                return(
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={option.isMandatory}
                      onChange={() => {
                        field.value = [...field.value, option];
                      }}
                    />
                    {option}
                  </label>
                </div>
              )})}
            </div>
          );
          break;
        default:
          fieldElement = null;
      }

      return (
        <div className="form-fields-container" key={index}>
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
        {/* Form's editor's toolbar */}
        <div className="form-toolbar">
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          <p className="form-toolbar-header">New Form Editor</p>
        </div>

        {/* Form's Body */}
        <div className="form-content">
          {/* Form's Header */}
          <h2>{form.name}</h2>

          {/* Form Validation Message */}
          {!validateForm(fields) && (
            <ul>
              <p className="form-invalid-message">
                Not All Required Fields Have Been Filled Up
              </p>
            </ul>
          )}

          <ul>
            <div className="form-container">
              {/* Form's Fields */}
              <ul>
                <p>Fields:</p>
                {renderFields()}
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
            </div>
          </ul>

          {/* Launch New Field Editor */}
          {showNewField && (
            <NewField
              onAddField={handleAddField}
              onClose={handleToggleNewField}
            />
          )}
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default Form;
