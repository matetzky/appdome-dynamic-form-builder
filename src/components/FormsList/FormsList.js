import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import './FormsList.css';

class FormsList extends React.Component {
  render() {
    const { forms, handleFormClick, handleDeleteForm:deleteForm, handleViewFormDetails } = this.props;

    return (
      <div className="forms-list">
        <h2 className="forms-list-title">Forms List</h2>
          {forms.map((form) => (
            <div key={form.id} className="form-item">
              <span className="form-name" onClick={() => handleFormClick(form.id)}>
                {form.name}
              </span>
              <div className="form-actions">
              <FontAwesomeIcon
                className="form-eye-icon"
                icon={faEye}
                onClick={() => handleViewFormDetails(form)}
              />
              <FontAwesomeIcon
                  className="form-edit-icon"
                  icon={faEdit}
                  onClick={() => handleFormClick(form.id)}
                />
              <FontAwesomeIcon
                className="form-delete-icon"
                icon={faTrash}
                onClick={() => deleteForm(form.id)}
              />
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default FormsList;
