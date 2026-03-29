import React from "react";
import "./Application.css";

function Application({
  index,
  application,
  handleApplicationChange,
  handleDeleteApplication,
  className,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleApplicationChange(index, name, value);
  };

  return (
    <div className={`Application ${className}`}>
      <div className="Application-main-container">
        <div className="Application-container">
          <label htmlFor={`application-date-${index}`}>Application Date</label>
          <input
            type="date"
            className="application-input"
            name="application_date"
            value={application.application_date}
            onChange={handleChange}
            id={`application-date-${index}`}
          />
        </div>
        <div className="Application-container">
          <label htmlFor={`application-company-${index}`}>Company</label>
          <input
            type="text"
            className="application-input"
            name="company"
            value={application.company}
            onChange={handleChange}
            id={`application-company-${index}`}
          />
        </div>
        <div className="Application-container">
          <label htmlFor={`application-title-${index}`}>Job Title</label>
          <input
            type="text"
            className="application-input"
            name="job_title"
            value={application.job_title}
            onChange={handleChange}
            id={`application-title-${index}`}
          />
        </div>
        <div className="Application-container">
          <label htmlFor={`application-details-${index}`}>Details</label>
          <input
            type="text"
            className="application-input"
            name="details"
            value={application.details}
            onChange={handleChange}
            id={`application-details-${index}`}
          />
        </div>
        <div className="Application-container">
          <label htmlFor={`application-contact-${index}`}>Contact</label>
          <input
            type="text"
            className="application-input"
            name="contact"
            value={application.contact}
            onChange={handleChange}
            id={`application-contact-${index}`}
          />
        </div>
        <div className="Application-container">
          <label htmlFor={`application-status-${index}`}>Status</label>
          <select
            className="application-input"
            name="status"
            value={application.status}
            onChange={handleChange}
            id={`application-status-${index}`}
          >
            <option value=""></option>
            <option value="Applied">Applied</option>
            <option value="Rejected">Rejected</option>
            <option value="In Discussions">In Discussions</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
        <div className="Application-container delete-button-container">
          <label htmlFor="delete-button">Actions</label>
          <button
            onClick={() => handleDeleteApplication(index, application.id)}
            className="delete-button"
            name="delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Application;
