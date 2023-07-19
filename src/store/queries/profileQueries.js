import { gql } from '@apollo/client';

const addProfileMutation = gql`
	mutation CreateProfile(
		$firstName: String!
		$lastName: String!
		$email: String!
		$isVerified: Boolean!
		$imageUrl: String!
		$description: String!
	) {
		createProfile(
			first_name: $firstName
			last_name: $lastName
			email: $email
			is_verified: $isVerified
			image_url: $imageUrl
			description: $description
		) {
			id
			first_name
			last_name
			email
			is_verified
			image_url
			description
		}
	}
`;

const removeProfileMutation = gql`
	mutation DeleteProfile($deleteProfileId: String!) {
		deleteProfile(id: $deleteProfileId)
	}
`;

const getProfilesQuery = gql`
	query GetAllProfiles($orderBy: globalOrderBy, $searchString: String, $rows: Int, $page: Int) {
		getAllProfiles(orderBy: $orderBy, searchString: $searchString, rows: $rows, page: $page) {
			size
			profiles {
				id
				first_name
				last_name
				email
				is_verified
				image_url
				description
			}
		}
	}
`;

const getProfileByIdQuery = gql`
	query GetProfileById($getProfileByIdId: String!) {
		getProfileById(id: $getProfileByIdId) {
			id
			first_name
			last_name
			email
			is_verified
			image_url
			description
		}
	}
`;

const updateProfileMutation = gql`
	mutation UpdateProfile(
		$updateProfileId: String!
		$firstName: String!
		$lastName: String!
		$email: String!
		$isVerified: Boolean!
		$imageUrl: String!
		$description: String!
	) {
		updateProfile(
			id: $updateProfileId
			first_name: $firstName
			last_name: $lastName
			email: $email
			is_verified: $isVerified
			image_url: $imageUrl
			description: $description
		) {
			id
			first_name
			last_name
			email
			is_verified
			image_url
			description
		}
	}
`;

export {
	addProfileMutation,
	removeProfileMutation,
	getProfilesQuery,
	getProfileByIdQuery,
	updateProfileMutation,
};
