import React from 'react';
import '../../../assets/scss/modal.scss';
import { Modal } from 'react-bootstrap';

function ModalCustom({ handleClose, show, children }) {
	return (
		<Modal
			show={show}
			onHide={() => {
				handleClose();
			}}
			keyboard={true}
			className={'vn-center-modal'}
			centered
			aria-labelledby="contained-modal-title-vcenter"
			animation={true}
		>
			<Modal.Body scrollable={true}>{children}</Modal.Body>
		</Modal>
	);
}

export default ModalCustom;
