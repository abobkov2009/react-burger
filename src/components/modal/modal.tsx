import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';


import modalStyles from './modal.module.css';


Modal.propTypes = {
    onCloseModalClick: PropTypes.func.isRequired,
    buttonPositionTop: PropTypes.number,
    children: PropTypes.element,
};

const modalRoot = document.getElementById("modal-window") as HTMLDivElement;

export default function Modal({ onCloseModalClick, buttonPositionTop, children }: InferProps<typeof Modal.propTypes>) {


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCloseModalClick();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    });

    const closeButtonTop = buttonPositionTop != null ? buttonPositionTop : 60;

    return ReactDOM.createPortal(
        (<div className={modalStyles.modal}>
            <ModalOverlay onCloseModalClick={onCloseModalClick} />
            <div className={modalStyles.container}>
                {children}
                <button className={modalStyles.closeModalButton} onClick={onCloseModalClick} style={{ top: `${closeButtonTop}px` }}>
                    <CloseIcon type="primary" />
                </button>
            </div>
        </div>
        )
        , modalRoot
    )
}