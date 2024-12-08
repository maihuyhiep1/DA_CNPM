import React from "react";
import "./popUp.css";

const Popup = ({ title, message, onClose, onRetry, showRetry = false }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h2 className="popup-title">{title}</h2>
                <p className="popup-message">{message}</p>
                <div className="popup-actions">
                    <button onClick={onClose} className="popup-button popup-close">
                        Đóng
                    </button>
                    {showRetry && (
                        <button onClick={onRetry} className="popup-button popup-retry">
                            Tiếp tục
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;
