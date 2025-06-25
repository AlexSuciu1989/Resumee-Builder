import React, { useState } from "react";
import AddResumee from "../AddResumee/AddResumee";
import WrappedViewResumee from "../ViewResumee/ViewResumee";
import MyApplications from "../MyApplications/MyApplications";
import Testimonials from "../Testimonials/Testimonials";
import WrappedViewResumeeFaang from "../ViewResumee/FaangResumee/ViewResumeeFaang";
import WrappedPremiumResume from "../ViewResumee/PremiumResume/PremiumResume";
import './Menu.css'

function Menu() {
    const [popupVisible, setPopupVisible] = useState('hidden');
    const [popupVisibleView, setPopupVisibleView] = useState('hidden');
    const [popupVisibleFaang, setPopupVisibleFaang] = useState('hidden');
    const [popupVisibleApplications, setPopupVisibleApplications] = useState('hidden');
    const [popupVisibleTestimonials, setPopupVisibleTestimonials] = useState('hidden');
    const [secondaryMenuVisible, setSecondaryMenuVisible] = useState('hidden');
    const [premiumResumeVisible, setPremiumResumeVisible] = useState('hidden');

    const handleClick = () => {
        setPopupVisible(popupVisible === 'hidden' ? 'visible' : 'hidden');
        setPopupVisibleView('hidden');
        setPopupVisibleApplications('hidden');
        setPopupVisibleTestimonials('hidden');
        setPopupVisibleFaang('hidden');
        setSecondaryMenuVisible('hidden');
        setPremiumResumeVisible('hidden');
    };

    const handleViewClick = () => {
        setPopupVisibleView(popupVisibleView === 'hidden' ? 'visible' : 'hidden');
        setPopupVisible('hidden');
        setPopupVisibleApplications('hidden');
        setPopupVisibleTestimonials('hidden');
        setPopupVisibleFaang('hidden');
        setPremiumResumeVisible('hidden');
    };

    const handleFaangClick = () => {
        setPopupVisibleFaang(popupVisibleFaang === 'hidden' ? 'visible' : 'hidden');
        setPopupVisible('hidden');
        setPopupVisibleApplications('hidden');
        setPopupVisibleTestimonials('hidden');
        setPopupVisibleView('hidden');
        setPremiumResumeVisible('hidden');
    };

    const handleApplicationsClick = () => {
        setPopupVisibleApplications(popupVisibleApplications === 'hidden' ? 'visible' : 'hidden');
        setPopupVisible('hidden');
        setPopupVisibleView('hidden');
        setPopupVisibleTestimonials('hidden');
        setPopupVisibleFaang('hidden');
        setSecondaryMenuVisible('hidden');
        setPremiumResumeVisible('hidden');
    };

    const handleTestimonialsClick = () => {
        setPopupVisibleTestimonials(popupVisibleTestimonials === 'hidden' ? 'visible' : 'hidden');
        setPopupVisibleApplications('hidden');
        setPopupVisible('hidden');
        setPopupVisibleView('hidden');
        setPopupVisibleFaang('hidden');
        setSecondaryMenuVisible('hidden');
        setPremiumResumeVisible('hidden');
    }

    const handleSecondaryMenuClick = () => {
        setSecondaryMenuVisible(secondaryMenuVisible === 'hidden' ? 'visible' : 'hidden');
    };

    const handlePremiumResumeClick = () => {
        setPremiumResumeVisible(premiumResumeVisible === 'hidden' ? 'visible' : 'hidden');
        setPopupVisible('hidden');
        setPopupVisibleView('hidden');
        setPopupVisibleApplications('hidden');
        setPopupVisibleTestimonials('hidden');
        setPopupVisibleFaang('hidden');
    }


    return (
        <div className="Menu">
            <div className="Menu-button-container">
                <div className="Menu-main-buttons">
                    <button onClick={handleClick} className="Menu-button">Create or Edit your Resumee</button>
                    <button onClick={handleSecondaryMenuClick} className="Menu-button">View and download your Resume</button>
                    <button onClick={handleApplicationsClick} className="Menu-button">Manage your Applications</button>
                    <button onClick={handleTestimonialsClick} className="Menu-button">Manage Testimonials</button>
                </div>
                <div className={`Menu-secondary-buttons ${secondaryMenuVisible}`}>
                    <button onClick={handleViewClick} className="Menu-button">STANDARD</button>
                    <button onClick={handleFaangClick} className="Menu-button">FAANG</button>
                    <button onClick={handlePremiumResumeClick} className="Menu-button">PREMIUM</button>      

                </div>
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

            <div className={`view-cv-container ${premiumResumeVisible}`}>
                <WrappedPremiumResume />
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
