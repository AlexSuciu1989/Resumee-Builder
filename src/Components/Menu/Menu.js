import React, { useState } from "react";
import AddResumee from "../AddResumee/AddResumee";
import WrappedViewResumee from "../ViewResumee/ViewResumee";
import MyApplications from "../MyApplications/MyApplications";
import Testimonials from "../Testimonials/Testimonials";
import WrappedViewResumeeFaang from "../ViewResumee/FaangResumee/ViewResumeeFaang";
import './Menu.css'

function Menu() {
    const [popupVisible, setPopupVisible] = useState('hidden');
    const [popupVisibleView, setPopupVisibleView] = useState('hidden');
    const [popupVisibleFaang, setPopupVisibleFaang] = useState('hidden');
    const [popupVisibleApplications, setPopupVisibleApplications] = useState('hidden');
    const [popupVisibleTestimonials, setPopupVisibleTestimonials] = useState('hidden');

    const handleClick = () => {
        setPopupVisible(popupVisible === 'hidden' ? 'visible' : 'hidden');
        setPopupVisibleView('hidden');
        setPopupVisibleApplications('hidden');
        setPopupVisibleTestimonials('hidden');
        setPopupVisibleFaang('hidden');
    };

    const handleViewClick = () => {
        setPopupVisibleView(popupVisibleView === 'hidden' ? 'visible' : 'hidden');
        setPopupVisible('hidden');
        setPopupVisibleApplications('hidden');
        setPopupVisibleTestimonials('hidden');
        setPopupVisibleFaang('hidden');
    };

    const handleFaangClick = () => {
        setPopupVisibleFaang(popupVisibleFaang === 'hidden' ? 'visible' : 'hidden');
        setPopupVisible('hidden');
        setPopupVisibleApplications('hidden');
        setPopupVisibleTestimonials('hidden');
        setPopupVisibleView('hidden');
    };

    const handleApplicationsClick = () => {
        setPopupVisibleApplications(popupVisibleApplications === 'hidden' ? 'visible' : 'hidden');
        setPopupVisible('hidden');
        setPopupVisibleView('hidden');
        setPopupVisibleTestimonials('hidden');
        setPopupVisibleFaang('hidden');
    };

    const handleTestimonialsClick = () => {
        setPopupVisibleTestimonials(popupVisibleTestimonials === 'hidden' ? 'visible' : 'hidden');
        setPopupVisibleApplications('hidden');
        setPopupVisible('hidden');
        setPopupVisibleView('hidden');
        setPopupVisibleFaang('hidden');
    }

    return (
        <div className="Menu">
            <div className="Menu-button-container">
                <button onClick={handleClick} className="Menu-button">Create or Edit your Resumee</button>
                <button onClick={handleViewClick} className="Menu-button">View your Resumee - STANDARD format</button>
                <button onClick={handleFaangClick} className="Menu-button">View your Resumee - FAANG format</button>
                <button onClick={handleApplicationsClick} className="Menu-button">Manage your Applications</button>
                <button onClick={handleTestimonialsClick} className="Menu-button">Manage Testimonials</button>
            </div>

            <div className={`create-cv-container ${popupVisible}`}>
                <AddResumee />
            </div>

            <div className={`view-cv-container ${popupVisibleView}`}>
                <WrappedViewResumee />
            </div>

            <div className={`view-cv-container ${popupVisibleFaang}`}>
                <WrappedViewResumeeFaang />
            </div>

            <div className={`view-cv-container ${popupVisibleApplications}`}>
                <MyApplications />
            </div>
            <div className={`view-cv-container ${popupVisibleTestimonials}`}>
                <Testimonials />
            </div>
        </div>
    );
}

export default Menu;
