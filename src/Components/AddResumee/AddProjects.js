import React from "react";
import './AddProjects.css'

function AddProjects({ index, projects, handleProjectsChange, handleDeleteProject }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        handleProjectsChange(index, id, value);
    };

    return (
        <div className="AddProjects">
            <button onClick={() => handleDeleteProject(index, projects.id)} className="delete-button">Delete</button>
            <div className="AddProjects-subcontainer">
                <label>Title</label>
                <input type="text" className="AddProjects-input" placeholder="Title" id="title" value={projects.title} onChange={handleChange} />
            </div>
            <div className="AddProjects-container">
                <div className="AddProjects-subcontainer">
                    <label>Starting Date</label>
                    <input type="date" className="AddProjects-input" id="date_from" value={projects.date_from === "0000-00-00" ? projects.date_from = "" : projects.date_from} onChange={handleChange} />
                </div>
                <div className="AddProjects-subcontainer">
                    <label>Ending Date</label>
                    <input type="date" className="AddProjects-input" id="date_to" value={projects.date_to === "0000-00-00" ? projects.date_to = "" : projects.date_to} onChange={handleChange} />
                </div>
            </div>
            <div className="AddProjects-subcontainer">
                <label>Project Description</label>
                <textarea id="description" className="AddProjects-input AddProjects-description" value={projects.description} onChange={handleChange}></textarea>
            </div>
        </div>
    );
}

export default AddProjects;