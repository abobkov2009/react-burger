import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import { modalWindowClosed } from '../../services/reducers';

type ModalProps = {
    children: React.ReactElement;
};

const modalRoot = document.getElementById("modal-window") as HTMLDivElement;

export default function Modal({ children }: ModalProps) {
    const dispatch = useDispatch();

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
        dispatch(modalWindowClosed());
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