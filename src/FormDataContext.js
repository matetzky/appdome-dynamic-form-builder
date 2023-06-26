import React, { createContext, useState } from 'react';

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (formId, fields) => {
    setFormData((prevData) => ({
      ...prevData,
      [formId]: fields,
    }));
  };

  const deleteFormData = (formId) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      delete updatedData[formId];
      return updatedData;
    });
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData, deleteFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
