import React from "react";
import './AddEducation.css'

function AddEducation({ index, education, handleEducationChange }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        handleEducationChange(index, id, value);
    };

    return (
        <div className="AddEducation">
            <div className="AddEducation-subcontainer">
                <label>Title</label>
                <input type="text" className="AddEducation-input" placeholder="Title" id="title" value={education.title} onChange={handleChange} />
            </div>
            <div className="AddEducation-container">
                <div className="AddEducation-subcontainer">
                    <label>Starting Date</label>
                    <input type="date" className="AddEducation-input" id="date_from" value={education.date_from} onChange={handleChange} />
                </div>
                <div className="AddEducation-subcontainer">
                    <label>Ending Date</label>
                    <input type="date" className="AddEducation-input" id="date_to" value={education.date_to} onChange={handleChange} />
                </div>
            </div>
            <div className="AddEducation-subcontainer">
                <label>School or Trainer</label>
                <input type="text" className="AddEducation-input" placeholder="School or Trainer" id="school_or_trainer" value={education.school_or_trainer} onChange={handleChange} />
            </div>
            <div className="AddEducation-container">
                <div className="AddEducation-subcontainer">
                    <label>City</label>
                    <input type="text" className="AddEducation-input" placeholder="City" id="city" value={education.city} onChange={handleChange} />
                </div>
                <div className="AddEducation-subcontainer">
                    <label>Country</label>
                    <input type="text" className="AddEducation-input" placeholder="Country" id="country" value={education.country} onChange={handleChange} />
                </div>
                <div className="AddEducation-subcontainer">
                    <label>Website</label>
                    <input type="text" className="AddEducation-input" id="website" placeholder="Website" value={education.website} onChange={handleChange} />
                </div>
            </div>
            <div className="AddEducation-subcontainer">
                <label>Description</label>
                <textarea id="description" className="AddEducation-input AddEducation-description" value={education.description} onChange={handleChange}></textarea>
            </div>
        </div>
    );
}

export default AddEducation;