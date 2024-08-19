// import "./HonoursAndAwards.css";

function HonoursAndAwards({ honor }) {
  const createMarkup = (html) => {
    return { __html: html.replace(/\n/g, "<br/>") };
  };

  return (
    <div className="honours-and-awards">
      <h3 className="honours-title">
        {honor.title}
        <span className="date"> [ {honor.date}] </span>
      </h3>
      <h3 className="honours-issuer">{honor.issuer}</h3>

      <p dangerouslySetInnerHTML={createMarkup(honor.description)} />
    </div>
  );
}

export default HonoursAndAwards;
