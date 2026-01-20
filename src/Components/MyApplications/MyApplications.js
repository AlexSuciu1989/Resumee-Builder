import React, { useState, useEffect, useMemo } from "react";
import "./MyApplications.css";
import Application from "./Application";
import axios from "axios";
import Cookies from "js-cookie";

function MyApplications() {
  const [user, setUser] = useState(Cookies.get("username") || "");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- NEW: filters state ---
  const [filters, setFilters] = useState({
    dateFrom: "", // e.g. "2025-01-01"
    dateTo: "", // e.g. "2025-12-31"
    company: "", // substring match
    job_title: "", // substring match
    status: "All", // exact match; "All" disables filter
  });

  const addApplication = () =>
    setApplications([
      {
        id: null,
        user,
        application_date: "",
        company: "",
        job_title: "",
        details: "",
        contact: "",
        status: "",
      },
      ...applications,
    ]);

  const handleApplicationChange = (index, field, value) => {
    setApplications((prevApplications) => {
      const updatedApplications = [...prevApplications];
      updatedApplications[index][field] = value;
      return updatedApplications;
    });
  };

  const handleDeleteApplication = async (index, id) => {
    setApplications((prevApplications) => {
      const updatedApplications = [...prevApplications];
      updatedApplications.splice(index, 1);
      return updatedApplications;
    });

    if (id) {
      try {
        await axios.post(
          "https://alexsuciu.ro/projects/jobrunner/php/postApplications.php",
          [{ id: id, company: "" }]
        );
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
  };

  const fetchData = async () => {
    if (user) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://alexsuciu.ro/projects/jobrunner/php/fetchApplications.php?user=${user}`
        );
        const data = response.data;
        if (data && data["cv-applications"]) {
          setApplications(data["cv-applications"]);
        } else {
          console.error("No applications found in response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = applications.map((application) => ({
      id: application.id,
      user: user,
      application_date: application.application_date,
      company: application.company,
      job_title: application.job_title,
      details: application.details,
      contact: application.contact,
      status: application.status,
    }));

    try {
      await axios.post(
        "https://alexsuciu.ro/projects/jobrunner/php/postApplications.php",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      await fetchData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- NEW: unique statuses for dropdown (computed once per applications change) ---
  const statusOptions = useMemo(() => {
    const set = new Set();
    applications.forEach((a) => {
      if (a?.status && String(a.status).trim() !== "")
        set.add(String(a.status));
    });
    return ["All", ...Array.from(set)];
  }, [applications]);

  // --- NEW: filtered list using useMemo (efficient re-computation) ---
  const filteredApplications = useMemo(() => {
    const normalize = (v) => (v ?? "").toString().toLowerCase().trim();

    const toISODate = (v) => {
      // attempt strict ISO pass-through first
      if (!v) return null;
      // Many UIs store yyyy-mm-dd. If the value is consistent, Date parsing is ok.
      // We’ll normalize to yyyy-mm-dd substring if present.
      const d = new Date(v);
      if (isNaN(d.getTime())) return null;
      // Format back to yyyy-mm-dd for reliable comparisons
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    const fromISO = toISODate(filters.dateFrom);
    const toISO = toISODate(filters.dateTo);

    return applications.filter((a) => {
      // Date filter (inclusive range)
      if (fromISO || toISO) {
        const appISO = toISODate(a?.application_date);
        if (!appISO) return false;
        if (fromISO && appISO < fromISO) return false;
        if (toISO && appISO > toISO) return false;
      }

      // Company substring (case-insensitive)
      if (filters.company) {
        const hay = normalize(a?.company);
        const needle = normalize(filters.company);
        if (!hay.includes(needle)) return false;
      }

      // Job title substring (case-insensitive)
      if (filters.job_title) {
        const hay = normalize(a?.job_title);
        const needle = normalize(filters.job_title);
        if (!hay.includes(needle)) return false;
      }

      // Status exact match (unless "All")
      if (filters.status && filters.status !== "All") {
        if ((a?.status ?? "") !== filters.status) return false;
      }

      return true;
    });
  }, [applications, filters]);

  // --- NEW: filter change helpers ---
  const handleFilterChange = (field) => (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      company: "",
      job_title: "",
      status: "All",
    });
  };

  return (
    <div className="MyApplications">
      <h2>My Applications</h2>

      {/* --- NEW: Filters UI --- */}
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="dateFrom">Date from</label>
          <input
            id="dateFrom"
            type="date"
            value={filters.dateFrom}
            onChange={handleFilterChange("dateFrom")}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="dateTo">Date to</label>
          <input
            id="dateTo"
            type="date"
            value={filters.dateTo}
            onChange={handleFilterChange("dateTo")}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="companyFilter">Company</label>
          <input
            id="companyFilter"
            type="text"
            placeholder="e.g. Microsoft"
            value={filters.company}
            onChange={handleFilterChange("company")}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="jobTitleFilter">Job title</label>
          <input
            id="jobTitleFilter"
            type="text"
            placeholder="e.g. Frontend Developer"
            value={filters.job_title}
            onChange={handleFilterChange("job_title")}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="statusFilter">Status</label>
          <select
            id="statusFilter"
            value={filters.status}
            onChange={handleFilterChange("status")}
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-actions">
          <button className="reset-filters-button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      </div>

      {/* Existing action buttons */}
      <div className="application-buttons-container">
        <button className="add-application-button" onClick={addApplication}>
          Add Application
        </button>
        <button className="save-applications-button" onClick={handleSubmit}>
          Save
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredApplications.map((application, index) => (
          <Application
            key={`${application.id ?? "new"}-${index}`}
            index={index}
            application={application}
            handleApplicationChange={handleApplicationChange}
            handleDeleteApplication={handleDeleteApplication}
            className={
              index % 2 === 0
                ? "application-color-one"
                : "application-color-two"
            }
          />
        ))
      )}
      {isSubmitting && <p>Submitting...</p>}
    </div>
  );
}

export default MyApplications;
