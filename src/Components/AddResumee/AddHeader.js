import React from "react";
import './AddHeader.css';

function AddHeader({ header, handleHeaderChange }) {

    const handleChange = (e) => {
        const { id, value } = e.target;
        handleHeaderChange(id, value);
    };

    return (
        <div className="AddHeader">
            <div className="AddHeader-container">
                <div className="AddHeader-subcontainer name-container">
                    <label htmlFor="name">Complete Name</label>
                    <input type="text" className="AddHeader-input" placeholder="Complete Name" id="name" value={header.name} onChange={handleChange}></input>
                </div>
                <div className="AddHeader-subcontainer">
                    <label htmlFor="home">Complete Adress</label>
                    <input type="text" className="AddHeader-input" placeholder="Complete Address" id="home" value={header.home} onChange={handleChange}></input>
                </div>
            </div>
            <div className="AddHeader-container">
                <div className="AddHeader-subcontainer">
                    <label htmlFor="email">Email Adress</label>
                    <input type="text" className="AddHeader-input" placeholder="Email Address" id="email" value={header.email} onChange={handleChange}></input>
                </div>
                <div className="AddHeader-subcontainer">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" className="AddHeader-input" placeholder="Phone Number" id="phone" value={header.phone} onChange={handleChange}></input>
                </div>
                <div className="AddHeader-subcontainer">
                    <label htmlFor="website">Website</label>
                    <input type="text" className="AddHeader-input" placeholder="Website" id="website" value={header.website} onChange={handleChange}></input>
                </div>
                <div className="AddHeader-subcontainer">
                    <label htmlFor="whatsapp">WhatsApp</label>
                    <input type="text" className="AddHeader-input" placeholder="WhatsApp Number" id="whatsapp" value={header.whatsapp} onChange={handleChange}></input>
                </div>
                <div className="AddHeader-subcontainer">
                    <label htmlFor="linkedin">Linkedin</label>
                    <input type="text" className="AddHeader-input" placeholder="LinkedIn" id="linkedin" value={header.linkedin} onChange={handleChange}></input>
                </div>
            </div>
            <div className="AddHeader-container">
                <div className="AddHeader-subcontainer">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" className="AddHeader-input" value={header.gender} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Not Specified">Not Specified</option>
                    </select>
                </div>
                <div className="AddHeader-subcontainer">
                    <label htmlFor="date_of_birth">Date of birth</label>
                    <input type="date" className="AddHeader-input" id="date_of_birth" value={header.date_of_birth} onChange={handleChange}></input>
                </div>
                <div className="AddHeader-subcontainer">
                    <label htmlFor="nationality">Nationality</label>
                    <input type="text" className="AddHeader-input" placeholder="Nationality" id="nationality" value={header.nationality} onChange={handleChange}></input>
                </div>
            </div>
            <div className="AddHeader-subcontainer">
                <label htmlFor="about_me">About Me</label>
                <textarea className="AddHeader-input" placeholder="About me" id="about_me" value={header.about_me} onChange={handleChange}></textarea>
            </div>
        </div>
    );
}

export default AddHeader;
