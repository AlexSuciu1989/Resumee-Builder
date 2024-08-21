import React, { useState, useEffect } from "react";
import AddHeader from "./AddHeader";
import './AddResumee.css';
import AddWorkExperience from "./AddWorkExperience";
import AddEducation from "./AddEducation";
import AddLanguageSkills from "./AddLanguageSkills";
import AddDigitalSkills from "./AddDigitalSkills";
import AddProjects from "./AddProjects";
import AddHonoursAndAwards from "./AddHonoursAndAwards";
import AddDrivingLicense from "./AddDrivingLicense";
import axios from "axios";
import Cookies from "js-cookie";

function AddResumee() {
    const [user, setUser] = useState(Cookies.get('username') || ""); // Initialize user from cookie
    const [header, setHeader] = useState({
        id: null,
        user: user,
        name: "", 
        home: "", 
        email: "", 
        phone: "", 
        website: "", 
        whatsapp: "", 
        linkedin: "", 
        gender: "", 
        date_of_birth: "", 
        nationality: "", 
        about_me: "" 
    });
    
    const [workExperiences, setWorkExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const [language, setLanguage] = useState([]);
    const [digitalSkill, setDigitalSkill] = useState([]);
    const [projects, setProjects] = useState([]);
    const [honours, setHonours] = useState([]);
    const [license, setLicense] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to handle changes in Header
    const handleHeaderChange = (field, value) => {
        setHeader({ ...header, [field]: value });
    };

    // Functions to add new items (with ID)
    const addWorkExperience = () => setWorkExperiences([...workExperiences, { id: null, user, position: "", company: "", date_from: "", date_to: "", city: "", country: "", description: "", technologies: "" }]);
    const addEducation = () => setEducation([...education, { id: null, user, title: "", date_from: "", date_to: "", school_or_trainer: "", city: "", country: "", website: "", description: "" }]);
    const addLanguage = () => setLanguage([...language, { id: null, user, language_type: "", language: "", listening: "", reading: "", writing: "", spoken_production: "", spoken_interaction: "" }]);
    const addDigitalSkill = () => setDigitalSkill([...digitalSkill, { id: null, user, skill: "" }]);
    const addProjects = () => setProjects([...projects, { id: null, user, title: "", date_from: "", date_to: "", description: "" }]);
    const addHonours = () => setHonours([...honours, { id: null, user, title: "", issuer: "", date: "", description: "" }]);
    const addLicense = () => setLicense([...license, { id: null, user, vehicle_type: "", license: "" }]);

    // Functions to handle changes
    const handleExperienceChange = (index, field, value) => { const newWorkExperiences = [...workExperiences]; newWorkExperiences[index][field] = value; setWorkExperiences(newWorkExperiences); };
    const handleEducationChange = (index, field, value) => { const newEducation = [...education]; newEducation[index][field] = value; setEducation(newEducation); };
    const handleLanguageChange = (index, field, value) => { const newLanguage = [...language]; newLanguage[index][field] = value; setLanguage(newLanguage); };
    const handleDigitalSkillChange = (index, field, value) => { const newSkill = [...digitalSkill]; newSkill[index][field] = value; setDigitalSkill(newSkill); };
    const handleProjectsChange = (index, field, value) => { const newProject = [...projects]; newProject[index][field] = value; setProjects(newProject); };
    const handleHonoursChange = (index, field, value) => { const newHonour = [...honours]; newHonour[index][field] = value; setHonours(newHonour); };
    const handleLicenseChange = (index, field, value) => { const newLicense = [...license]; newLicense[index][field] = value; setLicense(newLicense); };


    const handleDeleteExperience = async (index, id) => {
        const newWorkExperiences = [...workExperiences];
        newWorkExperiences.splice(index, 1);  // Remove the item from the array
        setWorkExperiences(newWorkExperiences);
    
        if (id) {
            try {
                await axios.post('https://alex-suciu.homebuddy.ro/resumee-builder/php/postWorkExperience.php', [{
                    id: id,
                    position: ""  // Set position to an empty string to trigger deletion
                    
                }]);
            } catch (error) {
                console.error("Error deleting experience:", error);
            }
        }
    };

    const handleDeleteEducation = async (index, id) => {
        const newEducation = [...education];
        newEducation.splice(index, 1);  // Remove the item from the array
        setEducation(newEducation);
    
        if (id) {
            try {
                await axios.post('https://alex-suciu.homebuddy.ro/resumee-builder/php/postEducation.php', [{
                    id: id,
                    title: ""  // Set position to an empty string to trigger deletion
                    
                }]);
            } catch (error) {
                console.error("Error deleting experience:", error);
            }
        }
    };

    const handleDeleteLanguage = async (index, id) => {
        const newLanguage = [...language];
        newLanguage.splice(index, 1);  // Remove the item from the array
        setLanguage(newLanguage);
    
        if (id) {
            try {
                await axios.post('https://alex-suciu.homebuddy.ro/resumee-builder/php/postLanguageSkills.php', [{
                    id: id,
                    language: ""  // Set position to an empty string to trigger deletion
                    
                }]);
            } catch (error) {
                console.error("Error deleting experience:", error);
            }
        }
    };

    const handleDeleteDigitalSkill = async (index, id) => {
        const newSkill = [...digitalSkill];
        newSkill.splice(index, 1);  // Remove the item from the array
        setDigitalSkill(newSkill);
    
        if (id) {
            try {
                await axios.post('https://alex-suciu.homebuddy.ro/resumee-builder/php/postDigitalSkills.php', [{
                    id: id,
                    digitalSkill: ""  // Set position to an empty string to trigger deletion
                    
                }]);
            } catch (error) {
                console.error("Error deleting experience:", error);
            }
        }
    };

    const handleDeleteProject = async (index, id) => {
        const newProject = [...projects];
        newProject.splice(index, 1);  // Remove the item from the array
        setProjects(newProject);
    
        if (id) {
            try {
                await axios.post('https://alex-suciu.homebuddy.ro/resumee-builder/php/postProjects.php', [{
                    id: id,
                    title: ""  // Set position to an empty string to trigger deletion
                    
                }]);
            } catch (error) {
                console.error("Error deleting experience:", error);
            }
        }
    };

    const handleDeleteHonour = async (index, id) => {
        const newHonour = [...honours];
        newHonour.splice(index, 1);  // Remove the item from the array
        setHonours(newHonour);
    
        if (id) {
            try {
                await axios.post('https://alex-suciu.homebuddy.ro/resumee-builder/php/postHonoursAndAwards.php', [{
                    id: id,
                    title: ""  // Set position to an empty string to trigger deletion
                    
                }]);
            } catch (error) {
                console.error("Error deleting experience:", error);
            }
        }
    };

    const handleDeleteLicense = async (index, id) => {
        const newLicense = [...license];
        newLicense.splice(index, 1);  // Remove the item from the array
        setLicense(newLicense);
    
        if (id) {
            try {
                await axios.post('https://alex-suciu.homebuddy.ro/resumee-builder/php/postDrivingLicense.php', [{
                    id: id,
                    license: ""  // Set position to an empty string to trigger deletion
                    
                }]);
            } catch (error) {
                console.error("Error deleting experience:", error);
            }
        }
    };

    // Fetch user data from the database if it exists
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://alex-suciu.homebuddy.ro/resumee-builder/php/fetchData.php?user=${user}`);
                    const data = response.data;
                    console.log(data);
                    if (data) {
                        setHeader(data["cv-header"][0] || {});
                        setWorkExperiences(data["cv-work-experience"] || []);
                        setEducation(data["cv-education-and-training"] || []);
                        setLanguage(data["cv-language-skills"] || []);
                        setDigitalSkill(data["cv-digital-skills"] || []);
                        setProjects(data["cv-projects"] || []);
                        setHonours(data["cv-honours-and-awards"] || []);
                        setLicense(data["cv-driving-license"] || []);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchData();
    }, [user]);

    // Combined submission function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const completeHeader = { ...header, user };
        try {
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postHeader.php", completeHeader);
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postWorkExperience.php", workExperiences);
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postEducation.php", education);
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postLanguageSkills.php", language);
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postDigitalSkills.php", digitalSkill);
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postProjects.php", projects);
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postHonoursAndAwards.php", honours);
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postDrivingLicense.php", license);
            window.location.reload();
            // console.log("Success:", { headerResponse, workExperienceResponse, educationResponse, languageResponse, digitalSkillResponse, projectsResponse, honoursResponse, licenseResponse });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="AddResumee">
            <div>
                <h2>UserName</h2>
                <input type="text" placeholder="username" id="user" value={user} onChange={(e) => setUser(e.target.value)} readOnly/>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div>
                        <h2>Basic Information</h2>
                        <AddHeader 
                            header={header}
                            handleHeaderChange={handleHeaderChange}
                        />
                        
                        <h2>Work Experience</h2>
                        {workExperiences.map((experience, index) => (
                            <AddWorkExperience 
                                key={index} 
                                index={index} 
                                experience={experience} 
                                handleExperienceChange={handleExperienceChange}
                                handleDeleteExperience={handleDeleteExperience}
                            />
                        ))}
                        <button onClick={addWorkExperience} className="add-button">Add Work Experience</button>
                        
                        <h2>Education and Training</h2>
                        {education.map((education, index) => (
                            <AddEducation
                                key={index}
                                index={index}
                                education={education}
                                handleEducationChange={handleEducationChange}
                                handleDeleteEducation={handleDeleteEducation}
                            />
                        ))}
                        <button onClick={addEducation} className="add-button">Add Education</button>

                        <h2>Language Skills</h2>
                        {language.map((language, index) => (
                            <AddLanguageSkills
                                key={index}
                                index={index}
                                language={language}
                                handleLanguageChange={handleLanguageChange}
                                handleDeleteLanguage={handleDeleteLanguage}
                            />
                        ))}
                        <button onClick={addLanguage} className="add-button">Add Language</button>

                        <h2>Digital Skills</h2>
                        {digitalSkill.map((digitalSkill, index) =>(
                            <AddDigitalSkills
                                key={index}
                                index={index}
                                digitalSkill={digitalSkill}
                                handleDigitalSkillChange={handleDigitalSkillChange}
                                handleDeleteDigitalSkill={handleDeleteDigitalSkill}
                            />
                        ))}
                        <button onClick={addDigitalSkill} className="add-button">Add Digital Skill</button>

                        <h2>Projects</h2>
                        {projects.map((projects, index) =>(
                            <AddProjects
                                key={index}
                                index={index}
                                projects={projects}
                                handleProjectsChange={handleProjectsChange}
                                handleDeleteProject={handleDeleteProject}
                            />
                        ))}
                        <button onClick={addProjects} className="add-button">Add Project</button>

                        <h2>Honours and Awards</h2>
                        {honours.map((honours, index) =>(
                            <AddHonoursAndAwards 
                                key={index}
                                index={index}
                                honours={honours}
                                handleHonoursChange={handleHonoursChange}
                                handleDeleteHonour={handleDeleteHonour}
                            />
                        ))}
                        <button onClick={addHonours} className="add-button">Add Honours and Awards</button>

                        <h2>Driving Licenses</h2>
                        {license.map((license, index) =>(
                            <AddDrivingLicense 
                                key={index}
                                index={index}
                                license={license}
                                handleLicenseChange={handleLicenseChange}
                                handleDeleteLicense={handleDeleteLicense}
                            />
                        ))}
                        <button onClick={addLicense} className="add-button">Add Driving License</button>
                    </div>
                    <div className="save-submit-container">
                        <button onClick={handleSubmit} className="save-submit-button">Save Resumee</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default AddResumee;
