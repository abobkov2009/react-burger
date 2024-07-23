import PropTypes, { InferProps } from 'prop-types';

import modalOverlayStyles from './modal-overlay.module.css';

ModalOverlay.propTypes = {
    onCloseModalClick: PropTypes.func.isRequired,
};

export default function ModalOverlay({ onCloseModalClick }: InferProps<typeof ModalOverlay.propTypes>) {
    return (
        <div className={modalOverlayStyles.modalOverlay} onClick={onCloseModalClick}></div>
    )
};