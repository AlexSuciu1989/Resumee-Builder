// import "./Projects.css";
import React from 'react';

function Projects({ project }) {
  const validDateFrom = project.date_from && project.date_from !== "0000-00-00";
  const validDateTo = project.date_to && project.date_to > project.date_from;

  return (
    <div className='projects'>
      <h3 className="projects-title">
        {project.title}{" "}
        {validDateFrom || validDateTo ? (
          <span className="date">
            [{validDateFrom ? project.date_from : ""}
            {validDateTo ? ` - ${project.date_to}` : ""}]
          </span>
        ) : null}
      </h3>
      <p>{project.description}</p>
    </div>
  );
}

export default Projects;
