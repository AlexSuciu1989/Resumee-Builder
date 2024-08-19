import React from "react";
import './AddDigitalSkills.css'

function AddDigitalSkills({ index, digitalSkill, handleDigitalSkillChange }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        handleDigitalSkillChange(index, id, value);
    };

    return (
        <div className="AddDigitalSkills">
            <input type="text" className="AddDigitalSkills-input" placeholder="Excel, HTML, React.js, ..." id="skill" value={digitalSkill.skill} onChange={handleChange} />
        </div>
    );
}

export default AddDigitalSkills;