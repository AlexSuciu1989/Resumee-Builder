import React, { useContext } from "react";
import { DataContext } from "../DataContex";
import DataProvider from "../DataContex";
import "./PremiumResume.css";

function PremiumResume() {
  const { data, loading, error } = useContext(DataContext);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="PremiumResume">
      {data["cv-header"].map((item, i) => (
        <header key={i}>
          <h1>{item.name}</h1>
          <p className="sub">
            {item.phone} · {item.home} · <a href={`mailto:${item.email}`}>{item.email}</a> · <a href={item.linkedin}>LinkedIn</a> · <a href={item.website}>Portfolio</a>
          </p>
          <section className="objective" dangerouslySetInnerHTML={{ __html: item.about_me.replace(/\n/g, "<br/>") }} />
        </header>
      ))}

      <section>
        <h2>Experience</h2>
        {data["cv-work-experience"]?.map((job, i) => (
          <div key={i} className="item">
            <div className="item-header">
              <h4>{job.position}</h4>
              <span>{job.company} · {job.city}, {job.country}</span>
              <time>{job.date_from} – {job.date_to > job.date_from ? job.date_to : "Present"}</time>
            </div>
            <p dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, "<br/>") }} />
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {data["cv-education-and-training"]?.map((edu, i) => (
          <div key={i} className="item">
            <h4>{edu.title}</h4>
            <p>{edu.school_or_trainer} · {edu.date_from?.substring(0, 4)}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {data["cv-projects"]?.map((proj, i) => (
          <div key={i} className="item">
            <h4>{proj.title}</h4>
            <p>{proj.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <p><strong>Digital Skills:</strong> {data["cv-digital-skills"]?.map((s, i) => s.skill).join(", ")}</p>
        <p>
          <strong>Languages:</strong>{" "}
          {data["cv-language-skills"]?.map((lang, i) => (
            `${lang.language} (${lang.language_type === "Mother tongue" ? "Native" : lang.listening})`
          )).join(", ")}
        </p>
      </section>
    </div>
  );
}

export default function WrappedPremiumResume() {
  return (
    <DataProvider>
      <PremiumResume />
    </DataProvider>
  );
}
