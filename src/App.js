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

  console.log('fun : fieldsOfCurrentForm', fieldsOfCurrentForm);
  console.log('fun : forms', forms);

  useEffect(() => {
      const updatedForms = forms.map((form) => {
        if (form.id === selectedFormId) {
          return {
            ...form,
            fields: [...form.fields, fieldsOfCurrentForm],
          };
        }
        return form;
      });
      setForms(updatedForms);
    
  }, [fieldsOfCurrentForm, selectedFormId])

  const handleNewFormClick = () => {
    setShowNewForm(true);
  };

  const handleNewFormClose = () => {
    setShowNewForm(false);
  };

  const handleNewFormSubmit = (newFormName) => {
    const newForm = {
      id: Date.now(),
      name: newFormName,
      fields: [],
    };

    setForms([...forms, newForm]);
    setShowNewForm(false);
  };

  const handleFormClick = (formId) => {
    setSelectedFormId(formId);
  };

  const handleViewFormDetails = (form) => {
    setSelectedForm(form);
  };

  const handleDeleteForm = (formId) => {
    setForms(forms.filter((form) => form.id !== formId));
  };

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
        {!selectedFormId && (
          <FormsList
            forms={forms}
            handleFormClick={handleFormClick}
            handleDeleteForm={handleDeleteForm}
            className="forms-list"
            handleViewFormDetails={handleViewFormDetails}
          />
        )}

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
