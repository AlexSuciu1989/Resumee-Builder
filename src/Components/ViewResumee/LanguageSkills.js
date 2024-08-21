// import "./LanguageSkills.css";

function LanguageSkills({ language }) {
  return (
    <div className="language-skills">
      <p>
        <span className="language-type">{language.language_type}:</span>{" "}
        {language.language}
      </p>
      {language.language_type === "Mother tongue" ? null : (
        <>
          <div className="language-first-row">
            <p>
              {language.listening && <span className="language-headers">Listening:</span>}{" "}
              <span className="language-levels">{language.listening}</span>
            </p>
            <p>
              {language.reading && <span className="language-headers">Reading:</span>}{" "}
              <span className="language-levels">{language.reading}</span>
            </p>
            <p>
              {language.writing && <span className="language-headers">Writing:</span>}{" "}
              <span className="language-levels">{language.writing}</span>
            </p>
          </div>
          <div className="language-second-row">
            <p>
              {language.spoken_production && <span className="language-headers">Spoken Production:</span>}{" "}
              <span className="language-levels">
                {language.spoken_production}
              </span>
            </p>
            <p>
              {language.spoken_interaction && <span className="language-headers">Spoken Interaction:</span>}{" "}
              <span className="language-levels">
                {language.spoken_interaction}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSkills;
