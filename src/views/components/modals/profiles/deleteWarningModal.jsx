import React, { useRef } from 'react';
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/close_24px.svg';
import Button from '../../button';
import { useMutation } from '@apollo/client';
import {
	removeProfileMutation
} from '../../../../store/queries/profileQueries';

function DeleteWarningModal({ title, bodyText, onCancel, onClose, selectedProfile, onRemoveProfile }) {
	const [doRemoveProfile, { loading: isRemovingProfile, error: removingProfileError }] =
		useMutation(removeProfileMutation);

	const handleDeleteProfile = (id) => {
		doRemoveProfile({variables: { deleteProfileId: id },
			onCompleted: () => {
				onRemoveProfile();
				onClose();
			},
			onError: () => {
			},});
	};

	console.log(isRemovingProfile)

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
					isLoading={isRemovingProfile}
					type="danger"
					title="Delete"
					onButtonClick={() => isRemovingProfile === false && handleDeleteProfile(selectedProfile.id)}
				/>
			</div>
		</div>
	);
}

export default DeleteWarningModal;
