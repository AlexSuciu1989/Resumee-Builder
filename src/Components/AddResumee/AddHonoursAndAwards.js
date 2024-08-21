import React from "react";
import './AddHonoursAndAwards.css'

function AddHonoursAndAwards({ index, honours, handleHonoursChange, handleDeleteHonour }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        handleHonoursChange(index, id, value);
    };

    return (
        <div className="AddHonours">
            <button onClick={() => handleDeleteHonour(index, honours.id)} className="delete-button">Delete</button>
            <div className="AddHonours-subcontainer">
                <label>Title</label>
                <input type="text" className="AddHonours-input" placeholder="Title" id="title" value={honours.title} onChange={handleChange} />
            </div>
            <div className="AddHonours-container">
                <div className="AddHonours-subcontainer">
                    <label>Issuer</label>
                    <input type="text" className="AddHonours-input AddHonours-issuer" placeholder="Issuer" id="issuer" value={honours.issuer} onChange={handleChange} />
                </div>
                <div className="AddHonours-subcontainer">
                    <label>Date</label>
                    <input type="date" className="AddHonours-input AddHonours-date" id="date" value={honours.date === "0000-00-00" ? honours.date = "" : honours.date} onChange={handleChange} />
                </div>
            </div>
            <div className="AddHonours-subcontainer">
                <label>Description</label>
                <textarea id="description" className="AddHonours-input AddHonours-description" value={honours.description} onChange={handleChange}></textarea>
            </div>
        </div>
    );
}

export default AddHonoursAndAwards;