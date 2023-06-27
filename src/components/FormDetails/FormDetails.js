import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "./FormDetails.css";

const FormDetails = ({ form, handleJsonViewerClose}) => {

const formAsJson = JSON.stringify(form, null, 2)
const parsedData = JSON.parse(formAsJson);
const formName = parsedData?.name;

const fieldsData = {};

parsedData?.fields?.flat().forEach((field) => {
  const { name, value } = field;
  fieldsData[name] = value;
});

const result = {
  formName,
  ...fieldsData
};

const downloadFormData = (formData) => {
  const json = JSON.stringify(formData, null, 2); // Convert the form data to a JSON string

  const element = document.createElement("a"); // Create a temporary anchor element
  const file = new Blob([json], { type: "application/json" }); // Create a Blob from the JSON string
  element.href = URL.createObjectURL(file); // Set the URL of the anchor element to the Blob URL
  element.download = "form_data.json"; // Specify the filename for the downloaded file
  element.click(); // Programmatically trigger a click event on the anchor element to start the download

  URL.revokeObjectURL(element.href); // Release the resources associated with the Blob URL
};


  return (
    <div className="json-viewer-container">
      <div className="json-view-toolbar">
        Form viewer as JSON
        <button className="close-button" onClick={handleJsonViewerClose}>
          X
        </button>
      </div>
      <div>
        <pre className="json">{JSON.stringify(result, null, 2)}</pre>
      </div>
      <div>
        <button className="download-button" onClick={() => downloadFormData(result)}>
          Download as JSON
          <FontAwesomeIcon className="form-download-icon" icon={faDownload} />
        </button>
      </div>
    </div>
  );
};

export default FormDetails;
