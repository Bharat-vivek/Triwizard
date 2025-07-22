import React, { useState } from 'react';
import './Feedback.css'
import { Rating } from "primereact/rating";

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(feedback);
        console.log(rating);
    };

    // const handleRatingChange = (e) => {
    //     setRating(e.target.value);
    // };

    const handleInputChange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
    };

    const [value, setValue] = useState(null);

    return (
        <div className="feedback-form">
            <h2>Leave Your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={feedback.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={feedback.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={feedback.message}
                        onChange={handleInputChange}
                        placeholder="Your Feedback"
                    />
                </div>
                <div className="rating-group">
                    <label>Rating:</label>
                    <div className="card flex justify-content-center">
                        <Rating value={value} onChange={(e) => setValue(e.value)}
                            cancelIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/cancel.png" alt="custom-cancel-image" width="25px" height="25px" />}
                            onIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png" alt="custom-image-active" width="25px" height="25px" />}
                            offIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png" alt="custom-image" width="25px" height="25px" />}
                        />
                    </div>
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;