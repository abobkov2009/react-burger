import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
    onCloseModalClick: () => void;
};

const ModalOverlay: React.FC<TModalOverlayProps> = ({ onCloseModalClick }) => {
    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={onCloseModalClick}></div>
    )
};

export default ModalOverlay;