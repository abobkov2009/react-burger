import modalOverlayStyles from './modal-overlay.module.css';

type ModalOverlayProps = {
    onCloseModalClick: () => void;
};

export default function ModalOverlay({ onCloseModalClick }: ModalOverlayProps) {
    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={onCloseModalClick}></div>
    )
};