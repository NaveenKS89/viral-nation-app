import React from 'react';
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/close_24px.svg';
import Button from '../../button';
import { useMutation } from '@apollo/client';
import {
	removeProfileMutation
} from '../../../../queries/profileQueries';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

function DeleteWarningModal({ title, bodyText, onCancel, onClose, selectedProfile, onRemoveProfile }) {
	const [doRemoveProfile, { loading: isRemovingProfile }] =
		useMutation(removeProfileMutation);

	const handleDeleteProfile = (id) => {
		let usertoken = localStorage.getItem('usertoken');
		const decoded = jwt_decode(usertoken);

		let currTheme = localStorage.getItem(`userThemePref::${decoded.candidate_name}`)
		doRemoveProfile({variables: { deleteProfileId: id },
			onCompleted: () => {
				toast.success('Profile removed!', {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: currTheme !== 'theme-dark' ?  "dark" : "light",
					});
				onRemoveProfile();
				onClose();
			},
			onError: () => {
				toast.error('Failed to remove Profile', {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: currTheme !== 'theme-dark' ?  "dark" : "light",
					});
			},});
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
