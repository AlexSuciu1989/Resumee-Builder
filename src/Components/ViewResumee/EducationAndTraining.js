import "./EducationAndTraining.css";

function EducationAndTraining({ edu }) {
  return (
    <div className="education-and-training">
      <h3 className="edu-title">
        {edu.title}{" "}
        <span className="date">
          [{" "}
          {edu.to === edu.from || edu.to === ""
            ? `${edu.from}`
            : `${edu.to} - ${edu.from}`}{" "}
          ]
        </span>
      </h3>
      <h3 className="edu-school">{edu.school_or_trainer}</h3>
      <p className="edu-location">
        {edu.city && (
          <>
            <span className="edu-city-country">City:</span> {edu.city} |
          </>
        )}
        {edu.country && (
          <>
            <span className="edu-city-country"> Country:</span> {edu.country}
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
      <p>{edu.description}</p>
    </div>
  );
}

export default EducationAndTraining;
