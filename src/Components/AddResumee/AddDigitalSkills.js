import React from "react";
import './AddDigitalSkills.css'

function AddDigitalSkills({ index, digitalSkill, handleDigitalSkillChange, handleDeleteDigitalSkill }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleDigitalSkillChange(index, name, value);
    };

    return (
        <div className="AddDigitalSkills">
            <input type="text" className="AddDigitalSkills-input" placeholder="Excel, HTML, React.js, ..." name="skill" value={digitalSkill.skill} onChange={handleChange} />
            <select className="AddDigitalSkills-type" name="skill_type" value={digitalSkill.skill_type} onChange={handleChange}>
                <option value="">Select Skill Type</option>
                <option value="Digital Skill">Digital Skill</option>
                <option value="Technical Skill">Technical Skill</option>
                <option value="Soft Skill">Soft Skill</option>
            </select>
            <button onClick={() => handleDeleteDigitalSkill(index, digitalSkill.id)} className="delete-button">Delete</button>
        </div>
    );
}

export default AddDigitalSkills;