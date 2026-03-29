import React, { useState } from "react";
import AddResumee from "../AddResumee/AddResumee";
import WrappedViewResumee from "../ViewResumee/ViewResumee";
import MyApplications from "../MyApplications/MyApplications";
import Testimonials from "../Testimonials/Testimonials";
import WrappedViewResumeeFaang from "../ViewResumee/FaangResumee/ViewResumeeFaang";
import WrappedPremiumResume from "../ViewResumee/PremiumResume/PremiumResume";
import "./Menu.css";





function Menu({ onMenuOpen }) {
  const [activeSection, setActiveSection] = useState(null);
  const [secondaryMenuVisible, setSecondaryMenuVisible] = useState(false);

  const openSection = (section) => {
    onMenuOpen();        // 🔔 notify App
    setActiveSection(section);
    setSecondaryMenuVisible(false);
  };

  const toggleSecondaryMenu = () => {
    onMenuOpen();        // 🔔 notify App
    setSecondaryMenuVisible(!secondaryMenuVisible);
    setActiveSection(null);
  };

  return (
    <div className="Menu">
      <div className="Menu-button-container">
        <div className="Menu-main-buttons">
          <button className="Menu-button" onClick={() => openSection("edit")}>
            Create or Edit your Resume
          </button>

          <button className="Menu-button" onClick={toggleSecondaryMenu}>
            View and download your Resume
          </button>

          <button
            className="Menu-button"
            onClick={() => openSection("applications")}
          >
            Manage your Applications
          </button>

          <button
            className="Menu-button"
            onClick={() => openSection("testimonials")}
          >
            Manage Testimonials
          </button>
        </div>

        {secondaryMenuVisible && (
          <div className="Menu-secondary-buttons">
            <button
              className="Menu-button"
              onClick={() => openSection("view-standard")}
            >
              STANDARD
            </button>
            <button
              className="Menu-button"
              onClick={() => openSection("view-faang")}
            >
              FAANG
            </button>
            <button
              className="Menu-button"
              onClick={() => openSection("view-premium")}
            >
              PREMIUM
            </button>
          </div>
        )}
      </div>

      {/* CONTENT */}
      {activeSection === "edit" && <AddResumee />}
      {activeSection === "view-standard" && <WrappedViewResumee />}
      {activeSection === "view-faang" && <WrappedViewResumeeFaang />}
      {activeSection === "view-premium" && <WrappedPremiumResume />}
      {activeSection === "applications" && <MyApplications />}
      {activeSection === "testimonials" && <Testimonials />}
    </div>
  );
}

export default Menu;
