import DataProvider from "./DataContex";
import Header from "./Header";
import WorkExperience from "./WorkExperience";
import Projects from "./Projects";
import EducationAndTraining from "./EducationAndTraining";
import LanguageSkills from "./LanguageSkills";
import DigitalSkills from './DigitalSkills';
import HonoursAndAwards from "./HonoursAndAwards";
import DrivingLicence from "./DrivingLicence";
import './ViewResumee.css';

import React, { useContext } from 'react';
import { DataContext } from "./DataContex";

function ViewResumee() {
    const { data, loading, error } = useContext(DataContext); // useContext should be inside the component

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data || !data['cv-work-experience']) return <p>No data available</p>; // Check if data exists

    return (
        <div className="ViewResumee">
            <Header />
            <h2 className="sub-title">WORK EXPERIENCE</h2>
          {data["cv-work-experience"].map((job, index) => (
            <WorkExperience key={index} job={job} />
          ))}
          <h2 className="sub-title">EDUCATION AND TRAINING</h2>
          {data["cv-education-and-training"].map((edu, index) => (
            <EducationAndTraining key={index} edu={edu} />
          ))}
          <h2 className="sub-title">LANGUAGE SKILLS</h2>
          {data["cv-language-skills"].map((language, index) => (
            <LanguageSkills key={index} language={language} />
          ))}
          <h2 className="sub-title">DIGITAL SKILLS</h2>
          <ul>
            {data["cv-digital-skills"].map((skills, index) => (
                <DigitalSkills key={index} skills={skills} />
            ))}
          </ul>
          <h2 className="sub-title">PROJECTS</h2>
          {data["cv-projects"].map((data, index) => (
            <Projects key={index} project={data} />
          ))}
          <h2 className="sub-title">HONOURS AND AWARDS</h2>
          {data["cv-honours-and-awards"].map((award, index) => (
            <HonoursAndAwards key={index} honor={award} />
          ))}
          <h2 className="sub-title">DRIVING LICENCE</h2>
          {data["cv-driving-license"].map((licence, index) => (
            <DrivingLicence key={index} licence={licence} />
            ))}
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
