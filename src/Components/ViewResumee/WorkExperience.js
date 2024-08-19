import "./WorkExperience.css";
import React from 'react';

function WorkExperience({job}) {

  return (

            <div className="work-experience" >
                <h3 className="position">
                    {job.position}{" "}
                    <span className="date">
                    [ {job.date_from} {job.date_to ? `- ${job.date_to}` : ""} ]
                    </span>
                </h3>

                <h3 className="company">{job.company}</h3>
                <p className="location">
                    <span className="city-country">City:</span> {job.city} |
                    <span className="city-country"> Country:</span> {job.country}
                </p>
                <p>{job.description}</p>
                <h4 className="technologies-title">Technologies</h4>
                <ul className="technologies">
                    {job.technologies.split(',').map((tech, index) => (
                    <li key={index}>{tech}</li>
                    ))}
                </ul>
            </div>
    
  );
}

export default WorkExperience;
