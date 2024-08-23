import React from "react";
import './AddEducation.css'

function AddEducation({ index, education, handleEducationChange, handleDeleteEducation }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleEducationChange(index, name, value);
    };

    return (
        <div className="AddEducation">
            <button onClick={() => handleDeleteEducation(index, education.id)} className="delete-button">Delete</button>
            <div className="AddEducation-subcontainer">
                <label>Title</label>
                <input type="text" className="AddEducation-input" placeholder="Title" name="title" value={education.title} onChange={handleChange} />
            </div>
            <div className="AddEducation-container">
                <div className="AddEducation-subcontainer">
                    <label>Starting Date</label>
                    <input type="date" className="AddEducation-input" name="date_from" value={education.date_from === "0000-00-00" ? education.date_to = "" : education.date_to} onChange={handleChange} />
                </div>
                <div className="AddEducation-subcontainer">
                    <label>Ending Date</label>
                    <input type="date" className="AddEducation-input" name="date_to" value={education.date_to === "0000-00-00" ? education.date_to = "" : education.date_to} onChange={handleChange} />
                </div>
            </div>
            <div className="AddEducation-subcontainer">
                <label>School or Trainer</label>
                <input type="text" className="AddEducation-input" placeholder="School or Trainer" name="school_or_trainer" value={education.school_or_trainer} onChange={handleChange} />
            </div>
            <div className="AddEducation-container">
                <div className="AddEducation-subcontainer">
                    <label>City</label>
                    <input type="text" className="AddEducation-input" placeholder="City" name="city" value={education.city} onChange={handleChange} />
                </div>
                <div className="AddEducation-subcontainer">
                    <label>Country</label>
                    <input type="text" className="AddEducation-input" placeholder="Country" name="country" value={education.country} onChange={handleChange} />
                </div>
                <div className="AddEducation-subcontainer">
                    <label>Website</label>
                    <input type="text" className="AddEducation-input" name="website" placeholder="Website" value={education.website} onChange={handleChange} />
                </div>
            </div>
            <div className="AddEducation-subcontainer">
                <label>Description</label>
                <textarea name="description" className="AddEducation-input AddEducation-description" value={education.description} onChange={handleChange}></textarea>
            </div>
        </div>
    );
}

export default AddEducation;