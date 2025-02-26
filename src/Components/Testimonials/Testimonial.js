import React from "react";
import "./Testimonial.css";

function Testimonial({ index, testimonial, handleTestimonialChange, handleDeleteTestimonial, readOnly }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleTestimonialChange(index, name, value);
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this testimonial?");
        if (isConfirmed) {
            handleDeleteTestimonial(index, testimonial.id);
        }
    };

    return (
        <div className="AddTestimonial">
            <div className="AddTestimonial-subcontainer">
                <label>Domain</label>
                <input
                    type="text"
                    placeholder="domain"
                    name="domain"
                    className="AddTestimonial-input"
                    value={testimonial.domain}
                    onChange={handleChange}
                    readOnly={readOnly}
                />
            </div>
            <div className="AddTestimonial-subcontainer">
                <label>Testimonial</label>
                <textarea
                    name="testimonial"
                    value={testimonial.testimonial}
                    className="AddTestimonial-input AddTestimonial-description"
                    onChange={handleChange}
                    readOnly={readOnly}
                />
            </div>
            <div className="AddTestimonial-subcontainer">
                <label>From Who</label>
                <input
                    type="text"
                    placeholder="from who"
                    name="person"
                    className="AddTestimonial-input"
                    value={testimonial.person}
                    onChange={handleChange}
                    readOnly={readOnly}
                />
            </div>
            {!readOnly && (
                <button onClick={handleDelete} className="delete-button">
                    Delete
                </button>
            )}
        </div>
    );
}

export default Testimonial;
