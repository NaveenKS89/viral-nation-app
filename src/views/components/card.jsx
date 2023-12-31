import React from 'react';
import { ReactComponent as BadgeIcon } from '../../assets/svg/badge.svg';
import { ReactComponent as MoreIcon } from '../../assets/svg/more_vert_24px.svg';
import Dropdown from './dropdown';
import validator from 'validator';

function Card({
	profile: { first_name, last_name, email, is_verified, image_url, description, id },
	onClickMore,
}) {
	const options = [
		{ label: 'Edit profile', value: 'edit_profile' },
		{ label: 'Remove profile', value: 'remove_profile' },
	];

	const DEFAULT_IMAGE = "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png";
	return (
		<div className="vn-grid-view-card">
			<div className="vn-card-top">
				<img alt={`${first_name} ${last_name}`} src={validator.isURL(image_url, {require_protocol: true}) ?image_url:  DEFAULT_IMAGE} />
				<div className="vn-card-top-right">
					<div className="vn-card-top-right-left">
						<div className="vn-card-profile-name-container">
							<span className="vn-card-profil-name">
								{first_name + ' ' + last_name}
							</span>
							{is_verified ? <BadgeIcon /> : ''}
						</div>
						<div className="vn-card-profile-email">{email}</div>
					</div>
					<span className="vn-card-top-right-right">
						<Dropdown
							options={options}
							onClickOption={(type) =>
								onClickMore(type, {
									first_name,
									last_name,
									email,
									is_verified,
									image_url,
									description,
									id,
								})
							}
						>
							<MoreIcon />
						</Dropdown>
					</span>
				</div>
			</div>
			<div className="vn-card-bottom">{description}</div>
		</div>
	);
}

export default Card;
