import React from "react";
import axios from "axios";
import { useState } from "react";
import './AddHeader.css'

function AddHeader () {

    const [formData, setFormData] = useState({
        name: "",
        home: "",
        email: "",
        phone: "",
        website: "",
        whatsapp: "",
        linkedin: "",
        gender: "",
        date_of_birth: "",
        nationality: "",
        about_me: ""
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://alex-suciu.homebuddy.ro/php/postHeader.php", formData);
            console.log("Success:", response.data);
        } catch (error){
            console.error("Error:", error)
        }
    }

    return (
        <form className="AddHeader" onSubmit={handleSubmit}>
            <input type="text" className="AddHeader-input" placeholder="Complete Name" id="name" value={formData.name} onChange={handleChange}></input>
            <input type="text" className="AddHeader-input" placeholder="Complete Adress" id="home" value={formData.home} onChange={handleChange}></input>
            <input type="text" className="AddHeader-input" placeholder="Email Adress" id="email" value={formData.email} onChange={handleChange}></input>
            <input type="text" className="AddHeader-input" placeholder="Phone Number" id="phone" value={formData.phone} onChange={handleChange}></input>
            <input type="text" className="AddHeader-input" placeholder="Website" id="website" value={formData.website} onChange={handleChange}></input>
            <input type="text" className="AddHeader-input" placeholder="WhatsApp Number" id="whatsapp" value={formData.whatsapp} onChange={handleChange}></input>
            <input type="text" className="AddHeader-input" placeholder="Linkedin" id="linkedin" value={formData.linkedin} onChange={handleChange}></input>
            <select id="gender" className="AddHeader-input" value={formData.gender} onChange={handleChange}>
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Not Specified">Not Specified</option>
            </select>
            <input type="date" className="AddHeader-input" id="date_of_birth" value={formData.date_of_birth} onChange={handleChange}></input>
            <input type="text" className="AddHeader-input" placeholder="Nationality" id="nationality" value={formData.nationality} onChange={handleChange}></input>
            <textarea className="AddHeader-input" placeholder="About me" value={formData.about_me} onChange={handleChange}></textarea>
            <button type="Submit">Submit</button>
        </form>
    )
}


export default AddHeader