import React, { useState } from 'react';
import { ReactComponent as CloseIcon } from '../../../../assets/svg/close_24px.svg';
import Button from '../../button';
import Input from '../../input';
import TextArea from '../../textarea';
import ToggleInput from '../../toggleInput';
import { useMutation } from '@apollo/client';
import {
	addProfileMutation,
	updateProfileMutation,
} from '../../../../queries/profileQueries';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

function AddEditProfileModal({ fields, onClose, isEdit, onAddProfile, onUpdateProfile }) {

	const [doCreateProfile, { loading: isCreatingProfile, error: creatingProfileError }] =
		useMutation(addProfileMutation);
	const [doEditProfile, { loading: isEditProfileLoading, error: editProfileError }] =
		useMutation(updateProfileMutation);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [image_url, setImage_url] = useState(fields?.image_url ? fields?.image_url : '');
	const [image_urlError, setImage_urlError] = useState(false);
	const [first_name, setFirst_name] = useState(fields?.first_name ? fields?.first_name : '');
	const [first_nameError, setFirst_nameError] = useState(false);
	const [last_name, setLast_name] = useState(fields?.last_name ? fields?.last_name : '');
	const [last_nameError, setLast_nameError] = useState(false);
	const [email, setEmail] = useState(fields?.email ? fields?.email : '');
	const [emailError, setEmailError] = useState(false);
	const [is_verified, setIs_verified] = useState(
		fields?.is_verified ? fields?.is_verified : false,
	);
	const [description, setDescription] = useState(fields?.description ? fields?.description : '');
	const [descriptionError, setDescriptionError] = useState(false);

	const handleEventChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		switch (name) {
			case 'image_url':
				setImage_url(value);
				if (value === '') {
					setImage_urlError(true);
				} else {
					setImage_urlError(false);
				}
				break;
			case 'first_name':
				setFirst_name(value);
				if (value === '') {
					setFirst_nameError(true);
				} else {
					setFirst_nameError(false);
				}
				break;
			case 'last_name':
				setLast_name(value);
				if (value === '') {
					setLast_nameError(true);
				} else {
					setLast_nameError(false);
				}
				break;
			case 'email':
				setEmail(value);
				if (value === '') {
					setEmailError(true);
				} else {
					setEmailError(false);
				}
				break;
			case 'is_verified':
				setIs_verified(value);
				break;
			case 'description':
				setDescription(value);
				if (value === '') {
					setDescriptionError(true);
				} else {
					setDescriptionError(false);
				}
				break;
			default:
				break;
		}
	};

	const handleSubmitAdd = () => {
		setIsSubmitting(true);
		let isError = false;
		let usertoken = localStorage.getItem('usertoken');
		const decoded = jwt_decode(usertoken);

		let currTheme = localStorage.getItem(`userThemePref::${decoded.candidate_name}`)
		if (image_url === '') {
			setImage_urlError(true);
			isError = true;
		}
		if (first_name === '') {
			setFirst_nameError(true);
			isError = true;
		}
		if (last_name === '') {
			setLast_nameError(true);
			isError = true;
		}
		if (email === '') {
			setEmailError(true);
			isError = true;
		}
		if (description === '') {
			setDescriptionError(true);
			isError = true;
		}

		if (!isError) {
			let json = {
				firstName: first_name,
				lastName: last_name,
				email: email,
				isVerified: is_verified,
				imageUrl: image_url,
				description: description,
			};

			doCreateProfile({
				variables: json,
				onCompleted: () => {
					toast.success('Profile added!', {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: currTheme !== 'theme-dark' ?  "dark" : "light",
						});
					onAddProfile();
					setIsSubmitting(false);
					onClose();
				},
				onError: () => {
					toast.error('Failed to add Profile', {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: currTheme !== 'theme-dark' ?  "dark" : "light",
						});
					setIsSubmitting(false);
				},
			});
		}
	};

	const handleSubmitEdit = () => {
		setIsSubmitting(true);
		let isError = false;
		let usertoken = localStorage.getItem('usertoken');
		const decoded = jwt_decode(usertoken);

		let currTheme = localStorage.getItem(`userThemePref::${decoded.candidate_name}`)

		if (image_url === '') {
			setImage_urlError(true);
			isError = true;
		}
		if (first_name === '') {
			setFirst_nameError(true);
			isError = true;
		}
		if (last_name === '') {
			setLast_nameError(true);
			isError = true;
		}
		if (email === '') {
			setEmailError(true);
			isError = true;
		}
		if (description === '') {
			setDescriptionError(true);
			isError = true;
		}

		if (!isError) {
			let json = {
				updateProfileId: fields.id,
				firstName: first_name,
				lastName: last_name,
				email: email,
				isVerified: is_verified,
				imageUrl: image_url,
				description: description,
			};

			doEditProfile({
				variables: json,
				onCompleted: () => {
					toast.success('Profile updated!', {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: currTheme !== 'theme-dark' ?  "dark" : "light",
						});
					onUpdateProfile();
					setIsSubmitting(false);
					onClose();
				},
				onError: () => {
					toast.error('Failed to update Profile', {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: currTheme !== 'theme-dark' ?  "dark" : "light",
						});
					setIsSubmitting(false);
				},
			});
		}
	};

	return (
		<div className="profile-add-edit-modal">
			<div className="profile-add-edit-header">
				<span className="header-title">{isEdit ? 'Edit Profile' : 'Create Profile'}</span>
				<span className="close-icon" onClick={() => onClose()}>
					<CloseIcon />
				</span>
			</div>
			<form className="profile-add-edit-body">
				<Input
					type="text"
					name="image_url"
					label="Image link"
					onChange={handleEventChange}
					value={image_url}
					inputError={image_urlError}
					errorMessage={image_urlError ? 'Required' : ''}
					required={true}
				/>
				<div className="profile-input-half">
					<Input
						type="text"
						name="first_name"
						label="First name"
						onChange={handleEventChange}
						value={first_name}
						inputError={first_nameError}
						errorMessage={first_nameError ? 'Required' : ''}
						required={true}
					/>
					<Input
						type="text"
						name="last_name"
						label="Last name"
						onChange={handleEventChange}
						value={last_name}
						inputError={last_nameError}
						errorMessage={last_nameError ? 'Required' : ''}
						required={true}
					/>
				</div>
				<Input
					type="text"
					name="email"
					label="Email"
					onChange={handleEventChange}
					value={email}
					inputError={emailError}
					errorMessage={emailError ? 'Required' : ''}
					required={true}
				/>
				<TextArea
					name="description"
					label=" Description"
					onChange={handleEventChange}
					value={description}
					inputError={descriptionError}
					errorMessage={descriptionError ? 'Required' : ''}
					required={true}
					rows={5}
				/>
				<ToggleInput
					title={is_verified ? 'Talent is verified' : 'Talent is not verified'}
					onToggle={handleEventChange}
					value={is_verified}
					label="Verification"
					name="is_verified"
				/>
			</form>
			<div className="profile-add-edit-tail">
				{creatingProfileError ? (
					<span className="form-error">{creatingProfileError?.message}</span>
				) : (
					''
				)}
				{editProfileError ? (
					<span className="form-error">{editProfileError?.message}</span>
				) : (
					''
				)}
				<Button
					type="primary"
					title={isEdit ? 'Edit Profile' : 'Create Profile'}
					onButtonClick={() => {
						if (!isEdit) {
							if (!isSubmitting && !isCreatingProfile) {
								handleSubmitAdd();
							}
						} else {
							if (!isSubmitting && !isEditProfileLoading) {
								handleSubmitEdit();
							}
						}
					}}
					isLoading={isCreatingProfile || isEditProfileLoading}
					minWidth="114px"
				/>
			</div>
		</div>
	);
}

export default AddEditProfileModal;
