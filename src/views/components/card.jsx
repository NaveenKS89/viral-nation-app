import React from 'react';
import { ReactComponent as BadgeIcon } from '../../assets/svg/badge.svg';
import { ReactComponent as MoreIcon } from '../../assets/svg/more_vert_24px.svg';
import Dropdown from './dropdown';

function Card({
	profile: { first_name, last_name, email, is_verified, image_url, description, id },
	onClickMore,
}) {
	const options = [
		{ label: 'Edit profile', value: 'edit_profile' },
		{ label: 'Remove profile', value: 'remove_profile' },
	];

	return (
		<div className="vn-grid-view-card">
			<div className="vn-card-top">
				<img alt={`Image of ${first_name} ${last_name}`} src={image_url} />
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
