// import "./EducationAndTraining.css";
import React from 'react';

function EducationAndTraining({ edu }) {
  const formattedDescription = edu.description.replace(/\n/g, "<br />");

  return (
    <div className="education-and-training">
      <h3 className="edu-title">
        {edu.title}{" "}
        <span className="date">
          {(edu.date_from === "0000-00-00" || edu.date_from === "") &&
          (edu.date_to === "0000-00-00" || edu.date_to === "")
            ? ""
            : `[${edu.date_from === "0000-00-00" || edu.date_from === "" ? "" : edu.date_from} ${
                edu.date_to > edu.date_from ? `- ${edu.date_to}` : ""
              }]`}
        </span>
      </h3>
      <h3 className="edu-school">{edu.school_or_trainer}</h3>
      <p className="edu-location">
        {edu.city && (
          <>
            {edu.city} |
          </>
        )}
        {edu.country && (
          <>
            <span className="edu-city-country">Country:</span> {edu.country}
          </>
        )}
      </p>

      <p>
        <a
          href={
            edu.website.substring(0, 8) === "https://"
              ? edu.website
              : `https://${edu.website}`
          }
        >
          {edu.website}
        </a>
      </p>

      {/* Use dangerouslySetInnerHTML for the description */}
      <p dangerouslySetInnerHTML={{ __html: formattedDescription }} />
    </div>
  );
}

export default EducationAndTraining;
