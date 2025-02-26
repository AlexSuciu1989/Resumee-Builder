import React, { useContext } from "react";
import { DataContext } from "../DataContex";
import DataProvider from "../DataContex";
import "./ViewResumeeFaang.css";
import pdfImg from '../../../Resources/file-pdf-solid.svg'

function ViewResumeeFaang() {
  const { data, loading, error } = useContext(DataContext);
  const handlePrint = () => {
    window.print()
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ViewResumeeFaang">
                  <div className="ViewResumee-print">
              <img src={pdfImg} onClick={() => handlePrint()} alt="Download as PDF" className="pdf-icon"></img>
            </div>
      {data["cv-header"].map((item, index) => (
        <div className="resumee-header" key={index}>
          <h1 className="name">{item.name}</h1>
          <p className="subtitle">
            {item.phone} | {item.home}
          </p>
          <p className="subtitle">
            <a href={item.email}>{item.email}</a> |{" "}
            <a href={item.linkedin}>{item.linkedin}</a> |{" "}
            <a href={item.website}>{item.website}</a>
          </p>
          <h5>OBJECTIVE</h5>
          <p
            className="objective"
            dangerouslySetInnerHTML={{
              __html: item.about_me.replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      ))}
      <div>
        <h5>EDUCATION</h5>
        {data["cv-education-and-training"]?.map((edu, index) => (
          <div className="education-container" key={index}>
            <p>
              <span className="edu-title">{edu.title}</span>,{" "}
              <span>{edu.school_or_trainer}</span>
            </p>
            <p>
              {edu.date_from.substring(0, 4) === "0000"
                ? ""
                : edu.date_from.substring(0, 4)}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h5>SKILLS</h5>
        <p>
          <span className="skill-title">Digital Skills:</span>
          {data["cv-digital-skills"]?.map((skills, index) => (
            <span key={index}>
              {" "}
              {skills.skill}
              {index === data["cv-digital-skills"].length - 1 ? "." : ","}
            </span>
          ))}
        </p>
        <p>
          <span className="skill-title">Language Skills:</span>
          {data["cv-language-skills"]?.map((language, index) => (
            <span key={index}>
              {language.language_type === "Mother tongue"
                ? ` ${language.language} (Native),`
                : ` ${language.language} (${language.listening})${
                    index === data["cv-language-skills"].length - 1 ? "." : ", "
                  }`}
            </span>
          ))}
        </p>
      </div>
      <div>
        <h5>EXPERIENCE</h5>
        {data["cv-work-experience"]?.map((job, index) => (
          <div key={index}>
            <div className="experience-header">
              <div>
                <p className="job-position">{job.position}</p>
                <p>{job.company}</p>
              </div>
              <div className="date-city-container">
                <p>
                  {job.date_from}
                  {job.date_to > job.date_from
                    ? `- ${job.date_to}`
                    : "- Present"}
                </p>
                <p>
                  {job.city}, {job.country}
                </p>
              </div>
            </div>
            <p
              className="job-description"
              dangerouslySetInnerHTML={{
                __html: job.description.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        ))}
      </div>
      <div>
        <h5>PROJECTS</h5>
        {data["cv-projects"]?.map((data, index) => (
          <div key={index}>
            <p className="project">
              <span className="project-title">{data.title}. </span>
              <span>{data.description}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WrappedViewResumeeFaang() {
  return (
    <DataProvider>
      <ViewResumeeFaang />
    </DataProvider>
  );
}
