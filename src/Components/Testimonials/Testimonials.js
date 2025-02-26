import Testimonial from "./Testimonial";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Testimonials.css";

function Testimonials() {
    const [user, setUser] = useState(Cookies.get("username") || "");
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Controls read-only mode

    const addTestimonial = () => {
        setTestimonials([...testimonials, { id: null, user, testimonials: "", person: "", domain: "" }]);
        setIsEditing(true); // Enable editing when adding a new testimonial
    };

    const handleTestimonialChange = (index, field, value) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index][field] = value;
        setTestimonials(newTestimonials);
    };

    const handleDeleteTestimonial = async (index, id) => {
        const newTestimonials = [...testimonials];
        newTestimonials.splice(index, 1);
        setTestimonials(newTestimonials);

        if (id) {
            try {
                await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postTestimonials.php", [
                    { id: id, testimonial: "" }
                ]);
            } catch (error) {
                console.error("Error deleting testimonial:", error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `https://alex-suciu.homebuddy.ro/resumee-builder/php/fetchTestimonials.php?user=${user}`
                    );
                    const data = response.data;
                    console.log(data);
                    if (data) {
                        setTestimonials(data["testimonials"] || []);
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

    const autoSave = async () => {
        try {
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postTestimonials.php", testimonials);
            console.log("Auto-saved successfully!");
        } catch (error) {
            console.error("Error during auto-save:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isEditing) autoSave();
        }, 300000);

        return () => clearInterval(intervalId);
    }, [testimonials, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/postTestimonials.php", testimonials);
            setIsEditing(false); // Lock fields again after saving
            console.log("Testimonials saved successfully!");
        } catch (error) {
            console.error("Error saving testimonials:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="Testimonials">
            {isSubmitting && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <div>
                <h2>User Name</h2>
                <input type="text" placeholder="username" id="user" value={user} readOnly />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2>Testimonials</h2>
                    {testimonials.map((testimonial, index) => (
                        <Testimonial
                            key={index}
                            index={index}
                            testimonial={testimonial}
                            handleTestimonialChange={handleTestimonialChange}
                            handleDeleteTestimonial={handleDeleteTestimonial}
                            readOnly={!isEditing} // Pass readOnly prop
                        />
                    ))}
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="add-button">
                            Edit Testimonials
                        </button>
                    ) : (
                        <>
                            <button onClick={addTestimonial} className="add-button">
                                Add Testimonial
                            </button>
                            <div className="save-submit-container">
                                <button onClick={handleSubmit} className="save-submit-button">
                                    Save Testimonials
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Testimonials;
