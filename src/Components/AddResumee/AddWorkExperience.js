import React from "react";
import './AddWorkExperience.css'

function AddWorkExperience({ index, experience, handleExperienceChange, handleDeleteExperience }) {

    const handleChange = (e) => {
        const { id, value } = e.target;
        handleExperienceChange(index, id, value);
    };

    return (
        <div className="AddWorkExperience">
            <button onClick={() => handleDeleteExperience(index, experience.id)} className="delete-button">Delete</button>
            <div className="AddWorkExperience-subcontainer">
                <label>Position</label>
                <input type="text" className="AddWorkExperience-input" placeholder="Position" id="position" value={experience.position} onChange={handleChange} />
            </div>
            <div className="AddWorkExperience-subcontainer">
                <label>Company</label>
                <input type="text" className="AddWorkExperience-input" placeholder="Company" id="company" value={experience.company} onChange={handleChange} />
            </div>
            <div className="AddWorkExperience-container">
                <div className="AddWorkExperience-subcontainer">
                    <label>Starting Date</label>
                    <input type="date" className="AddWorkExperience-input" id="date_from" value={experience.date_from === "0000-00-00" ? experience.date_from = "" : experience.date_from} onChange={handleChange} />
                </div>
                <div className="AddWorkExperience-subcontainer">
                    <label>Ending Date</label>
                    <input type="date" className="AddWorkExperience-input" id="date_to" value={experience.date_to === "0000-00-00" ? experience.date_to = "" : experience.date_to} onChange={handleChange} />
                </div>
            </div>
            <div className="AddWorkExperience-container">
                <div className="AddWorkExperience-subcontainer">
                    <label>City</label>
                    <input type="text" className="AddWorkExperience-input" placeholder="City" id="city" value={experience.city} onChange={handleChange} />
                </div>
                <div className="AddWorkExperience-subcontainer">
                    <label>Country</label>
                    <input type="text" className="AddWorkExperience-input" placeholder="Country" id="country" value={experience.country} onChange={handleChange} />
                </div>
            </div>
            <div className="AddWorkExperience-subcontainer">
                <label>Position description</label>
                <textarea id="description" className="AddWorkExperience-input AddWorkExperience-description" value={experience.description} onChange={handleChange}></textarea>
            </div>
            <div className="AddWorkExperience-subcontainer">
                <label>Technologies Used</label>
                <input type="text" className="AddWorkExperience-input" id="technologies" placeholder="HTML, CSS, React, ..." value={experience.technologies} onChange={handleChange} />
            </div>
        </div>
    );
}

export default AddWorkExperience;
