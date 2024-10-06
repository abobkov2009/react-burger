import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
    onCloseModalClick: () => void;
};

export default function ModalOverlay({ onCloseModalClick }: TModalOverlayProps): React.JSX.Element {
    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={onCloseModalClick} data-testid="modal-overlay"></div>
    )
};

