import React from "react";
import './AddLanguageSkills.css'

function AddLanguageSkills({ index, language, handleLanguageChange }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        handleLanguageChange(index, id, value);
    };

    return (
        <div className="AddLanguageSkills">
            <div className="AddLanguageSkills-container">
                <div className="AddLanguageSkills-subcontainer">
                    <label>Language Type</label>
                    <select className="AddLanguageSkills-input" id="language_type" value={language.language_type} onChange={handleChange}>
                        <option value="Mother tongue">Mother tongue</option>
                        <option value="Other language">Other language</option>
                    </select>
                </div>
                <div className="AddLanguageSkills-subcontainer">
                    <label>Language</label>
                    <input type="text" className="AddLanguageSkills-input" id="language" value={language.language} onChange={handleChange} />
                </div>
            </div>
            <div className="AddLanguageSkills-container">
                <div className="AddLanguageSkills-subcontainer">
                    <label>Listening</label>
                    <select className="AddLanguageSkills-input" id="listening" value={language.listening} onChange={handleChange}>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                    </select>
                </div>
                <div className="AddLanguageSkills-subcontainer">
                    <label>Reading</label>
                    <select className="AddLanguageSkills-input" id="reading" value={language.reading} onChange={handleChange}>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                    </select>
                </div>
                <div className="AddLanguageSkills-subcontainer">
                    <label>Writing</label>
                    <select className="AddLanguageSkills-input" id="writing" value={language.writing} onChange={handleChange}>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                    </select>
                </div>
                <div className="AddLanguageSkills-subcontainer">
                    <label>Spoken Production</label>
                    <select className="AddLanguageSkills-input" id="spoken_production" value={language.spoken_production} onChange={handleChange}>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                    </select>
                </div>
                <div className="AddLanguageSkills-subcontainer">
                    <label>Spoken Interaction</label>
                    <select className="AddLanguageSkills-input" id="spoken_interaction" value={language.spoken_interaction} onChange={handleChange}>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                    </select>
                </div>
            </div>
    
        </div>
    );
}

export default AddLanguageSkills;