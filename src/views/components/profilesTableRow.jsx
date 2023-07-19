import React from 'react';
import { ReactComponent as BadgeIcon } from '../../assets/svg/badge.svg';
import { ReactComponent as MoreIcon } from '../../assets/svg/more_vert_24px.svg';
import Dropdown from './dropdown';

function ProfilesTableRow({
	profile: { first_name, last_name, email, is_verified, image_url, description, id },
	onClickMore,
}) {
	const options = [
		{ label: 'Edit profile', value: 'edit_profile' },
		{ label: 'Remove profile', value: 'remove_profile' },
	];
	return (
		<tr>
			<td>
				<div className="td-container">
					<img src={image_url} alt={`Image of ${first_name} ${last_name}`} />
					<span className="profile-name">
						{first_name} {last_name}
					</span>
					{is_verified && (
						<span>
							<BadgeIcon />
						</span>
					)}
				</div>
			</td>
			<td>{id}</td>
			<td>{email}</td>
			<td>{description}</td>
			<td>
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
			</td>
		</tr>
	);
}

export default ProfilesTableRow;
