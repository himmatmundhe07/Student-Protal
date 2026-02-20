import React from 'react';

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{title}</h2>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button className="btn decrement" onClick={onConfirm} style={{ width: 'auto' }}>
                        Confirm
                    </button>
                    <button className="btn reset" onClick={onCancel} style={{ width: 'auto' }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
