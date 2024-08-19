import "./DrivingLicence.css";

function DrivingLicence({ licence }) {
  return (
    <div>
      <p>
        <span className="licence-type">{licence.vehicle_type}: </span>{" "}
        <span className="licence">{licence.license}</span>
      </p>
    </div>
  );
}

export default DrivingLicence;
