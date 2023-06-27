import React, { useState, useEffect } from "react";
import FormsList from "./components/FormsList/FormsList";
import NewForm from "./components/NewFormPopup/NewFormPopup";
import Form from "./components/Form/Form";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormDetails from "./components/FormDetails/FormDetails"
import "./App.css";

const App = () => {
  const [forms, setForms] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [fieldsOfCurrentForm, setFieldsOfCurrentForm] = useState([]);


  // This useEffect is triggered when a form is selected or when it's fields have been modified
  // It receives the local changes in a form's fields and updates the global forms state inside the App component
  useEffect(() => {
      const updatedForms = forms.map((form) => {
        if (form.id === selectedFormId) {
          return {
            ...form,
            fields: [...fieldsOfCurrentForm],
          };
        }
        return form;
      });
      setForms(updatedForms);
    
  }, [fieldsOfCurrentForm, selectedFormId])

  // Displays the new form popup
  const handleNewFormClick = () => {
    setShowNewForm(true);
  };

  // Initiating of a new form
  const handleNewFormSubmit = (newFormName) => {
    const newForm = {
      id: Date.now(),
      name: newFormName,
      fields: [],
    };

    setForms([...forms, newForm]);
    setShowNewForm(false);
  };

  // Trigered when a form is selected
  const handleFormClick = (formId) => {
    setSelectedFormId(formId);
  };

  // Selects a form to be displayed as JSON
  const handleViewFormDetails = (form) => {
    setSelectedForm(form);
  };

  const handleDeleteForm = (formId) => {
    setForms(forms.filter((form) => form.id !== formId));
  };

  // sent to every form as a prop to allow modification of the global forms state inside the App component
  const updateCurrentFormFields = (currentEditedFormFields) => {
    const updatedForms = forms.map((form) => {
      if (form.id === selectedFormId) {
        return {
          ...form,
          fields: [...form.fields, currentEditedFormFields],
        };
      }
      return form;
    });
    setForms(updatedForms);
  };

  const handleFormClose = () => {
    setSelectedFormId(null);
  };

  return (
    <div>
      <h1 className="header-title">My Forms</h1>

      <div className="content">

        {/* List of Forms */}
          <FormsList
            forms={forms}
            handleFormClick={handleFormClick}
            handleDeleteForm={handleDeleteForm}
            className="forms-list"
            handleViewFormDetails={handleViewFormDetails}
          />

        {/* New Form Window */}
        <button className="new-form-button" onClick={handleNewFormClick}>
          Create New Form
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="create-new-form-icon"
          />
        </button>
        {showNewForm && <NewForm handleNewFormSubmit={handleNewFormSubmit} />}

        {/* Selected Form */}
        {selectedFormId && (
          <Form
            form={forms.find((form) => form.id === selectedFormId)}
            updateCurrentFormFields={setFieldsOfCurrentForm}
            handleClose={handleFormClose}
          />
        )}
         <FormDetails form={selectedForm} />
      </div>
    </div>
  );
};

export default App;
