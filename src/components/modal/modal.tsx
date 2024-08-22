import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';


type ModalProps = {
    onModalClose?: () => void;
    children: React.ReactElement;
};

const modalRoot = document.getElementById("modal-window") as HTMLDivElement;

export default function Modal({ onModalClose, children }: ModalProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModalWindow();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const closeModalWindow = () => {
        onModalClose ? onModalClose() : navigate(-1);
    }

    return ReactDOM.createPortal(
        (<div className={modalStyles.modal}>
            <ModalOverlay onCloseModalClick={closeModalWindow} />
            <div className={modalStyles.container}>
                {children}
                <button className={modalStyles.closeModalButton} onClick={closeModalWindow}>
                    <CloseIcon type="primary" />
                </button>
            </div>
        </div>
        )
        , modalRoot
    )
};