import React, { useEffect, useState } from 'react';
import './globals.css'
const Popup = ({ images, selectedImageIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(selectedImageIndex);
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="close-btn" onClick={onClose}>
                    &times;
                </div>

                <button className="nav-button" onClick={goToPrevious}>
                    <i className="fa-solid fa-chevron-left"></i> {/* FontAwesome icon for left arrow */}
                </button>
                <img src={images[currentIndex].img} alt="Popup" />
                <button className="nav-button" onClick={goToNext}>
                    <i className="fa-solid fa-chevron-right"></i> {/* FontAwesome icon for right arrow */}
                </button>

                <div className="popup-navigation">
                    <div className='popup-details'>{images[currentIndex].title}</div>
                    <div className='popup-details'>{images[currentIndex].date}</div>


                </div>
            </div>
        </div>
    );
};

export default Popup;
