import React, { useState, useEffect } from 'react';
import './LoginDashboard.css';
import { useNavigate } from 'react-router-dom';

const LoginDashboard = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState([
        { src: 'image1.jpg', alt: 'Image 1' },
        { src: 'image2.jpg', alt: 'Image 2' },
        { src: 'image3.jpg', alt: 'Image 3' },
    ]);
    const [isIframeEnlarged, setIsIframeEnlarged] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [images.length]);

    const handleSignup = () => {
        navigate('/loginpage');
    };

    const toggleIframe = () => {
        setIsIframeEnlarged(!isIframeEnlarged);
    };

    return (
        <>
            <div className="container">
                <nav className="navbar-logindashboard">
                    <div className="navbar-left">
                        <h2>Educate Girls</h2>
                    </div>
                    <div className="navbar-right">
                        <button className="loginpage-btn">About</button>
                        <button className="loginpage-btn">Contact</button>
                        <button className="loginpage-btn" onClick={handleSignup}>SignUp</button>
                    </div>
                </nav>

                <div className="container-logindashboard">
                    <div className="info-section">
                        <h2>Empowering Underprivileged Girls Through Education</h2>
                        <p>Our mission is to provide access to quality education for girls in underserved communities, breaking the cycle of poverty and empowering them to reach their full potential.</p>
                    </div>
                    <div className="carousel-section">
                        <div className="carousel">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`carousel-item ${activeIndex === index ? 'active' : ''}`}
                                >
                                    <img src={image.src} alt={image.alt} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="cards-section">
                    <div className="card">
                        <h3>12,345</h3>
                        <p>Girls Enrolled</p>
                    </div>
                    <div className="card">
                        <h3>85%</h3>
                        <p>Graduation Rate</p>
                    </div>
                    <div className="card">
                        <h3>Rs 100,00</h3>
                        <p>Scholarships Awarded</p>
                    </div>
                </div>

                <div className={`iframe-container ${isIframeEnlarged ? 'enlarged' : ''}`}>
                    <iframe
                        src="https://mlsc-tiet-mlscchatbot.hf.space"
                        title="Chatbot"
                    ></iframe>
                </div>

                <div className="iframe-icon" onClick={toggleIframe}>
                    {isIframeEnlarged ? 'close' : <img src="./chatbot.png" alt="Chatbot Icon" style={{ height: "50px" }}/>}
                </div>
            </div>
        </>
    );
}

export default LoginDashboard;
