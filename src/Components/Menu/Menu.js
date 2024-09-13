import React, { useState } from "react";
import AddResumee from "../AddResumee/AddResumee";
import WrappedViewResumee from "../ViewResumee/ViewResumee";
import MyApplications from "../MyApplications/MyApplications";
import './Menu.css'

function Menu() {
    const [popupVisible, setPopupVisible] = useState('hidden');
    const [popupVisibleView, setPopupVisibleView] = useState('hidden');
    const [popupVisibleApplications, setPopupVisibleApplications] = useState('hidden');

    const handleClick = () => {
        setPopupVisible(popupVisible === 'hidden' ? 'visible' : 'hidden');
        setPopupVisibleView('hidden');
        setPopupVisibleApplications('hidden');
    };

    const handleViewClick = () => {
        setPopupVisibleView(popupVisibleView === 'hidden' ? 'visible' : 'hidden');
        setPopupVisible('hidden');
        setPopupVisibleApplications('hidden');
    };

    const handleApplicationsClick = () => {
        setPopupVisibleApplications(popupVisibleApplications === 'hidden' ? 'visible' : 'hidden');
        setPopupVisible('hidden');
        setPopupVisibleView('hidden');
    };

    return (
        <div className="Menu">
            <div className="Menu-button-container">
                <button onClick={handleClick} className="Menu-button">Create or Edit your Resumee</button>
                <button onClick={handleViewClick} className="Menu-button">View your Resumee</button>
                <button onClick={handleApplicationsClick} className="Menu-button">Manage your Applications</button>
            </div>

            <div className={`create-cv-container ${popupVisible}`}>
                <AddResumee />
            </div>

            <div className={`view-cv-container ${popupVisibleView}`}>
                <WrappedViewResumee />
            </div>

            <div className={`view-cv-container ${popupVisibleApplications}`}>
                <MyApplications />
            </div>
        </div>
    );
}

export default Menu;
