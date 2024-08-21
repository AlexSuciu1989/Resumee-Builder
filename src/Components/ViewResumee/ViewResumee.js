import DataProvider from "./DataContex";
import Header from "./Header";
import WorkExperience from "./WorkExperience";
import Projects from "./Projects";
import EducationAndTraining from "./EducationAndTraining";
import LanguageSkills from "./LanguageSkills";
import DigitalSkills from './DigitalSkills';
import HonoursAndAwards from "./HonoursAndAwards";
import DrivingLicence from "./DrivingLicence";
import pdfImg from '../../Resources/file-pdf-solid.svg'
import './ViewResumee.css';
import './templates/purple.css';
import './templates/orange.css';
import './templates/gray.css';
import './templates/green.css';
import './templates/blue.css';
import './templates/print.css';

import React, { useContext, useState } from 'react';
import { DataContext } from "./DataContex";

function ViewResumee() {
    const { data, loading, error } = useContext(DataContext); // useContext should be inside the component
    const [template, setTemplate] = useState("purple");

    const handleTemplateChange = (newTemplate) => {
      setTemplate(newTemplate)
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No data available</p>; // Check if data exists

    const handlePrint = () => {
      window.print()
    }

    return (
        <div className={`ViewResumee ${template}`}>
          <div className="ViewResumee-colors-print">
            <div className="ViewResumee-cv-colors">
              <button className="purple-button" onClick={() => handleTemplateChange("purple")}></button>
              <button className="orange-button" onClick={() => handleTemplateChange("orange")}></button>
              <button className="gray-button" onClick={() => handleTemplateChange("gray")}></button>
              <button className="green-button" onClick={() => handleTemplateChange("green")}></button>
              <button className="blue-button" onClick={() => handleTemplateChange("blue")}></button>
            </div>
            <div className="ViewResumee-print">
              <img src={pdfImg} onClick={() => handlePrint()} alt="Download as PDF" className="pdf-icon"></img>
            </div>
          </div>
          <div className="ViewResumee-subcontainer">
              <Header />
              {data["cv-work-experience"]?.length > 0 && <h2 className="sub-title">WORK EXPERIENCE</h2>}
              {data["cv-work-experience"]?.map((job, index) => (
                <WorkExperience key={index} job={job} />
              ))}
              {data["cv-education-and-training"]?.length > 0 && <h2 className="sub-title">EDUCATION AND TRAINING</h2>}
              {data["cv-education-and-training"]?.map((edu, index) => (
                <EducationAndTraining key={index} edu={edu} />
              ))}
              {data["cv-language-skills"]?.length > 0 && <h2 className="sub-title">LANGUAGE SKILLS</h2>}
              {data["cv-language-skills"]?.map((language, index) => (
                <LanguageSkills key={index} language={language} />
              ))}
              {data["cv-digital-skills"]?.length > 0 && <h2 className="sub-title">DIGITAL SKILLS</h2>}
              <div className="digital-skills">
                <ul>
                  {data["cv-digital-skills"]?.map((skills, index) => (
                      <DigitalSkills key={index} skills={skills} />
                  ))}
                </ul>
              </div>
              {data["cv-projects"]?.length > 0 && <h2 className="sub-title">PROJECTS</h2>}
              {data["cv-projects"]?.map((data, index) => (
                <Projects key={index} project={data} />
              ))}
              {data["cv-honours-and-awards"]?.length > 0 && <h2 className="sub-title">HONOURS AND AWARDS</h2>}
              {data["cv-honours-and-awards"]?.map((award, index) => (
                <HonoursAndAwards key={index} honor={award} />
              ))}
              {data["cv-driving-license"]?.length > 0 && <h2 className="sub-title">DRIVING LICENCE</h2>}
              {data["cv-driving-license"]?.map((licence, index) => (
                <DrivingLicence key={index} licence={licence} />
              ))}
          </div>
        </div>
    );
}

export default function WrappedViewResumee() {
    return (
        <DataProvider>
            <ViewResumee />
        </DataProvider>
    );
}
