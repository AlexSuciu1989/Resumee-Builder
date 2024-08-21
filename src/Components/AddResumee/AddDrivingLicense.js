import React from "react";
import './AddDrivingLicense.css'

function AddDrivingLicense({ index, license, handleLicenseChange, handleDeleteLicense }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        handleLicenseChange(index, id, value);
    };

    return (
        <div className="AddDrivingLicense">
            <button onClick={() => handleDeleteLicense(index, license.id)} className="delete-button">Delete</button>
            <div className="AddDrivingLicense-container">
                <div className="AddDrivingLicense-subcontainer">
                    <label>Vehicle Type</label>
                    <input type="text" className="AddDrivingLicense-input" placeholder="Car, Motorcycle..." id="vehicle_type" value={license.vehicle_type} onChange={handleChange} />
                </div>
                <div className="AddDrivingLicense-subcontainer">
                    <label>License</label>
                    <input type="text" className="AddDrivingLicense-input" placeholder="AM, A1, B, ..." id="license" value={license.license} onChange={handleChange} />
                </div>
            </div>
            
        </div>
    );
}

export default AddDrivingLicense;