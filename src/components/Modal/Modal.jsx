import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({ url, onClose }) {
    useEffect(() => {
        const clickEsc = event => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        const clickBackdrop = event => {
            if (event.target === event.currentTarget) {
                onClose();
            }
        };

        window.addEventListener('keydown', clickEsc);
        window.addEventListener('click', clickBackdrop);

     
        return () => {
            window.removeEventListener('keydown', clickEsc);
            window.removeEventListener('click', clickBackdrop);
        };
    }, [onClose]); 

    return (
        <div className={s.overlay}>
            <div className={s.modal}>
                <img src={url} alt="" />
            </div>
        </div>
    );
}

Modal.propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
