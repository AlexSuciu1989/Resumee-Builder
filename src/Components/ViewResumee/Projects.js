// import "./Projects.css";
import React from 'react';

function Projects({ project }) {

  return (
    <div className='projects'>
      <h3 className="projects-title">
        {project.title}{" "}
        <span className="date">
          [{project.date_from}{project.date_to > project.date_from ? `- ${project.date_from}` : ""}]
        </span>
      </h3>
      <p>{project.description}</p>
    </div>
  );
}

export default Projects;
