import React from 'react'
import "./dialog.css";

const CustomDialog = ({ open, onClose, onSubmit, children }) => {
    if (!open) return null;

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div
                className="dialog-container"
                onClick={(e) => e.stopPropagation()} // Ngăn đóng khi nhấn bên trong
            >
                <div className="dialog-header">
                    <h3>Report Post</h3>
                    <button className="dialog-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="dialog-content">{children}</div>
                <div className="dialog-footer">
                    <button className="dialog-btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="dialog-btn submit" onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomDialog;