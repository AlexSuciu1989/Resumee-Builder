import React, { useState, useEffect } from "react";
import './MyApplications.css';
import Application from "./Application";
import axios from "axios";
import Cookies from "js-cookie";

function MyApplications() {
    const [user, setUser] = useState(Cookies.get('username') || "");
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                await axios.post('https://alex-suciu.homebuddy.ro/resumee-builder/php/postApplications.php', [{
                    id: id,
                    company: ""  // Set company to an empty string to trigger deletion
                }]);
            } catch (error) {
                console.error("Error deleting application:", error);
            }
        }
    };

    const fetchData = async () => {
        if (user) {
            setLoading(true);
            try {
                console.log("Fetching data for user:", user);
                const response = await axios.get(`https://alex-suciu.homebuddy.ro/resumee-builder/php/fetchApplications.php?user=${user}`);
                const data = response.data;
                console.log("Fetched data:", data);
                if (data && data['cv-applications']) {
                    setApplications(data['cv-applications']);
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
        
        // Prepare the data payload
        const payload = applications.map(application => ({
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
                "https://alex-suciu.homebuddy.ro/resumee-builder/php/postApplications.php",
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Re-fetch the data after saving
            await fetchData();

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="MyApplications">
            <h2>My Applications</h2>
            <div className="application-buttons-container">
                <button className="add-application-button" onClick={addApplication}>Add Application</button>
                <button className="save-applications-button" onClick={handleSubmit}>Save</button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                applications.map((application, index) => (
                    <Application
                        key={index}
                        index={index}
                        application={application}
                        handleApplicationChange={handleApplicationChange}
                        handleDeleteApplication={handleDeleteApplication}
                        className={index % 2 === 0 ? 'application-color-one' : 'application-color-two'}// Set background color based on index
                    />
                ))
            )}
            {isSubmitting && <p>Submitting...</p>}
        </div>
    );
}

export default MyApplications;
