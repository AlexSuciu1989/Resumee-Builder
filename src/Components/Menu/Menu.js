import React, { useState } from "react";
import AddResumee from "../AddResumee/AddResumee";
import WrappedViewResumee from "../ViewResumee/ViewResumee";
import './Menu.css'

function Menu () {

    const [popupVisible, setPopupVisible] = useState('hidden');

    const [popupVisibleView, setPoupupVisibleView] = useState('hidden');

    const handleViewClick = () => {
        setPoupupVisibleView(!popupVisibleView);
        setPopupVisible('hidden');
    }

    const handleClick = () => {
        setPopupVisible(!popupVisible);
        setPoupupVisibleView('visible');
    }

    return (
        <div className="Menu">
            <div className="Menu-button-container">
                <button onClick={handleClick} className="Menu-button">Create or Edit your Resumee</button>
                <button onClick ={handleViewClick} className="Menu-button">View your Resumee</button>
            </div>

            <div className={`create-cv-container ${popupVisible ? 'hidden' : 'visible'}`}>
                <AddResumee/>
            </div>

            <div className={`view-cv-container ${popupVisibleView ? 'hidden' : 'visible'}`}>
                <WrappedViewResumee/>
            </div>
        </div>
    )
}

export default Menu