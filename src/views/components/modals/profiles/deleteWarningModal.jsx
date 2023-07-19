import React, { useRef } from 'react';
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/close_24px.svg';
import Button from '../../button';
import { useThunk } from '../../../../hooks/use-thunk';
import { removeProfile } from '../../../../store';

function DeleteWarningModal({ title, bodyText, onCancel, onClose, selectedProfile }) {
	const [doRemoveProfile, isRemovingProfile, removingProfileError] = useThunk(removeProfile);
	let timerRef = useRef();

	const handleDeleteProfile = (id) => {
		doRemoveProfile({ deleteProfileId: id });
		timerRef = setInterval(() => {
			if (isRemovingProfile === false) {
				onClose();
				clearInterval(timerRef);
			}
			if (removingProfileError !== null) {
				clearInterval(timerRef);
			}
		}, 100);
	};

	return (
		<div className="delete-profile-modal">
			<div className="delete-profile-header">
				<span className="header-title">{title}</span>
				<DeleteIcon onClick={() => onClose()} />
			</div>
			<div className="delete-profile-body">{bodyText}</div>
			<div className="delete-profile-tail">
				<Button type="secondary" title="Cancel" onButtonClick={onCancel} />
				<Button
					type="danger"
					title="Delete"
					onButtonClick={() => handleDeleteProfile(selectedProfile.id)}
				/>
			</div>
		</div>
	);
}

export default DeleteWarningModal;
