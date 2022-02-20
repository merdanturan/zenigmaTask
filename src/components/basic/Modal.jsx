import React, { useEffect } from 'react';
import '../../assets/scss/components/Modal.scss'

const Modal = ({
    children,
    onClose,
    active
}) => {

    ///Close Modal when press ESC

    const handleKeyDown = e => e.key === "Escape" && (e.stopPropagation() || onClose());

    useEffect(
        () => {
            if (active) {
                document.addEventListener("keydown", handleKeyDown);
                return () => {
                    document.removeEventListener("keydown", handleKeyDown, false);
                };
            } else {
                document.removeEventListener("keydown", handleKeyDown, false);
            }
        },
        [active]
    );

    return (
        <>
            {active &&
                <div className='modalContainer'>
                    <div className='modalContent'>
                        <span className='modalClose' onClick={() => onClose()}>&times;</span>
                        {children}
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;
