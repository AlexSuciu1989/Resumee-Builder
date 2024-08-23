import React from "react";
import './AddWorkExperience.css'

function AddWorkExperience({ index, experience, handleExperienceChange, handleDeleteExperience }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleExperienceChange(index, name, value);
    };
    

    return (
        <div className="AddWorkExperience">
            <button onClick={() => handleDeleteExperience(index, experience.id)} className="delete-button">Delete</button>
            <div className="AddWorkExperience-subcontainer">
                <label>Position</label>
                <input type="text" className="AddWorkExperience-input" placeholder="Position" name="position" value={experience.position} onChange={handleChange} />
            </div>
            <div className="AddWorkExperience-subcontainer">
                <label>Company</label>
                <input type="text" className="AddWorkExperience-input" placeholder="Company" name="company" value={experience.company} onChange={handleChange} />
            </div>
            <div className="AddWorkExperience-container">
                <div className="AddWorkExperience-subcontainer">
                    <label>Starting Date</label>
                    <input type="date" className="AddWorkExperience-input" name="date_from" value={experience.date_from === "0000-00-00" ? experience.date_from = "" : experience.date_from} onChange={handleChange} />
                </div>
                <div className="AddWorkExperience-subcontainer">
                    <label>Ending Date</label>
                    <input type="date" className="AddWorkExperience-input" name="date_to" value={experience.date_to === "0000-00-00" ? experience.date_to = "" : experience.date_to} onChange={handleChange} />
                </div>
            </div>
            <div className="AddWorkExperience-container">
                <div className="AddWorkExperience-subcontainer">
                    <label>City</label>
                    <input type="text" className="AddWorkExperience-input" placeholder="City" name="city" value={experience.city} onChange={handleChange} />
                </div>
                <div className="AddWorkExperience-subcontainer">
                    <label>Country</label>
                    <input type="text" className="AddWorkExperience-input" placeholder="Country" name="country" value={experience.country} onChange={handleChange} />
                </div>
            </div>
            <div className="AddWorkExperience-subcontainer">
                <label>Position description</label>
                <textarea name="description" className="AddWorkExperience-input AddWorkExperience-description" value={experience.description} onChange={handleChange}></textarea>
            </div>
            <div className="AddWorkExperience-subcontainer">
                <label>Technologies Used</label>
                <input type="text" className="AddWorkExperience-input" name="technologies" placeholder="HTML, CSS, React, ..." value={experience.technologies} onChange={handleChange} />
            </div>
        </div>
    );
    
}

export default AddWorkExperience;
