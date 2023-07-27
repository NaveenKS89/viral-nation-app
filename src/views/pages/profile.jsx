import { useEffect, useState } from 'react';
import { withRouter } from '../../services/withRouter';
import SearchBar from '../components/searchBar';
import { ReactComponent as AddProfileIcon } from '../../assets/svg/plus-profile.svg';
import ActionsContainer from '../components/actionsContainer';
import Button from '../components/button';
import ToggleView from '../components/toggleView';
import Card from '../components/card';
import Modal from '../components/modals';
import InfiniteScrollComponent from '../components/infiniteScrollComponent';
import DeleteWarningModal from '../components/modals/profiles/deleteWarningModal';
import AddEditProfileModal from '../components/modals/profiles/addEditProfileModal';
import ProfilesTableRow from '../components/profilesTableRow';
import _ from 'lodash';
import { useDebounce } from '../../hooks/useDebounce';
import TableContainer from '../components/tableContainer';
import { useQuery } from '@apollo/client';
import { getProfilesQuery } from '../../queries/profileQueries';
import LoadingIcon from '../components/LoadingIcon';
import { NetworkStatus } from '@apollo/client';

function Profile() {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [sortBy, setSortBy] = useState('is_verified');
	const [sortOrder, setSortOrder] = useState(-1);
	const [rows, setRows] = useState(16);
	const [selectedProfile, setSelectedProfile] = useState(null);

	const [view, setView] = useState('card');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);

	const headers = [
		{ name: 'Name', key: 'is_verified', isSortable: true },
		{ name: 'ID', key: 'id', isSortable: false },
		{ name: 'Email', key: 'email', isSortable: true },
		{ name: 'description', key: 'description', isSortable: false },
	];

	const { networkStatus, error, data, refetch, fetchMore } = useQuery(getProfilesQuery, {
		variables: {
			orderBy: {
				key: sortBy,
				sort: sortOrder === -1 ? 'desc' : 'asc',
			},
			rows: rows,
			page: page,
			searchString: search,
		},
		notifyOnNetworkStatusChange: true,
	});

	const debouncedRequest = useDebounce(() => {
		refetch({
			page: 0,
			searchString: search,
		});
		setPage(0);
	});

	const handleWindowResize = (event) => {
		// Get width and height of the window excluding scrollbars
		var w = document.documentElement.clientWidth;
		//var h = document.documentElement.clientHeight;

		if (w <= 768 && view !== 'card') {
			handleChangeView('card');
		} else if (w > 768 && view !== 'table') {
			handleChangeView('table');
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, [handleWindowResize]);

	const handleAddProfile = () => {
		setShowAddModal(true);
	};

	const fetchMoreFunc = () => {
		if (page * rows + rows < data.getAllProfiles.size) {
			let newPage = page + 1;

			fetchMore({
				variables: {
					page: newPage,
				},
				updateQuery: (previousResult, { fetchMoreResult }) => {
					const newProfiles = fetchMoreResult.getAllProfiles.profiles;
					return {
						getAllProfiles: {
							size: fetchMoreResult.getAllProfiles.size,
							profiles: [...previousResult.getAllProfiles.profiles, ...newProfiles],
						},
					};
				},
			});
		}
	};

	const handleClickMore = (type, profile) => {
		if (type === 'edit_profile') {
			setSelectedProfile(profile);
			setShowAddModal(true);
		}
		if (type === 'remove_profile') {
			setSelectedProfile(profile);
			setShowDeleteModal(true);
		}
	};

	const handleChangeView = (view) => {
		refetch({
			orderBy: {
				key: sortBy,
				sort: sortOrder === -1 ? 'desc' : 'asc',
			},
			rows: view === 'table' ? 10 : 16,
			page: 0,
			searchString: search,
		});

		if (view === 'table') {
			setRows(10);
		} else {
			setRows(16);
		}
		setView(view);
		setPage(0);
	};

	const onDetailsUpdated = () => {
		refetch({
			orderBy: {
				key: sortBy,
				sort: sortOrder === -1 ? 'desc' : 'asc',
			},
			rows: view === 'table' ? 10 : 16,
			page: 0,
			searchString: search,
		});
		setPage(0);
	};

	const onSortTable = (value) => {
		let sBy = value;
		let sOrder = -1;
		if (value === sortBy) {
			sOrder = sortOrder * -1;
			setSortOrder((sort) => sort * -1);
		} else {
			sOrder = -1;
			setSortBy(value);
			setSortOrder(-1);
		}

		refetch({
			orderBy: {
				key: sBy,
				sort: sOrder === -1 ? 'desc' : 'asc',
			},
			rows: rows,
			page: 0,
			searchString: search,
		});
		setPage(0);
	};

	const onClickChangeRows = (value) => {
		refetch({
			orderBy: {
				key: sortBy,
				sort: sortOrder === -1 ? 'desc' : 'asc',
			},
			rows: value,
			page: 0,
			searchString: search,
		});
		setPage(0);
		setRows(value);
	};

	const fetchPrev = () => {
		if (page > 0) {
			let newPage = page - 1;
			refetch({
				orderBy: {
					key: sortBy,
					sort: sortOrder === -1 ? 'desc' : 'asc',
				},
				rows: rows,
				page: newPage,
				searchString: search,
			});
			setPage(page - 1);
		}
	};

	const fetchNext = () => {
		if (page * rows + rows < data.getAllProfiles.size) {
			refetch({
				orderBy: {
					key: sortBy,
					sort: sortOrder === -1 ? 'desc' : 'asc',
				},
				rows: rows,
				page: page + 1,
				searchString: search,
			});
			setPage(page + 1);
		}
	};

	const onChangeSearch = (e) => {
		const value = e.target.value;
		setSearch(value);
		debouncedRequest();
	};

	/* if (loading === true) {
		return <LoadingIcon />;
	} */

	if (error) {
		<>
			<ActionsContainer>
				<SearchBar value={search} onChange={(e) => {}} />
				<div className="vn-actions-right-container">
					<Button
						type="primary"
						title="Create Profile"
						leftIcon={<AddProfileIcon />}
						isOutline={true}
						onButtonClick={() => {}}
						isLoading={false}
					/>
					<ToggleView onViewChange={() => {}} activeView={view} />
				</div>
			</ActionsContainer>
			<div className="vn-infinite-container">{error?.message}</div>
		</>;
	}

	return (
		<>
			<ActionsContainer>
				<SearchBar value={search} onChange={(e) => onChangeSearch(e)} />
				<div className="vn-actions-right-container">
					<Button
						type="primary"
						title="Create Profile"
						leftIcon={<AddProfileIcon />}
						isOutline={true}
						onButtonClick={handleAddProfile}
						isLoading={false}
					/>
					<ToggleView onViewChange={(view) => handleChangeView(view)} activeView={view} />
				</div>
			</ActionsContainer>
			{networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch ? (
				<div className="vn-infinite-container">
					<LoadingIcon />
				</div>
			) : view === 'card' ? (
				<div className="vn-infinite-container">
					<InfiniteScrollComponent
						dataLength={_.size(data?.getAllProfiles.profiles)}
						next={fetchMoreFunc}
						hasMore={
							_.size(data?.getAllProfiles.profiles) <
							(data?.getAllProfiles.size ? data?.getAllProfiles.size : 0)
						}
					>
						{_.map(data?.getAllProfiles.profiles, (profile, index) => {
							return (
								<Card
									key={'card' + profile.id + index}
									profile={profile}
									onClickMore={handleClickMore}
								/>
							);
						})}
					</InfiniteScrollComponent>
				</div>
			) : (
				<TableContainer
					headers={headers}
					onSortTable={onSortTable}
					hasSettings={true}
					onClickChangeRows={onClickChangeRows}
					rows={rows}
					page={page}
					size={data?.getAllProfiles.size}
					sortBy={sortBy}
					sortOrder={sortOrder}
					fetchPrev={fetchPrev}
					fetchNext={fetchNext}
				>
					{_.map(data?.getAllProfiles.profiles, (profile, index) => {
						return (
							<ProfilesTableRow
								key={'table' + profile.id + index}
								profile={profile}
								onClickMore={handleClickMore}
							/>
						);
					})}
				</TableContainer>
			)}
			{showDeleteModal ? (
				<Modal
					handleClose={() => {
						setSelectedProfile(null);
						setShowDeleteModal(false);
					}}
					show={showDeleteModal}
				>
					<DeleteWarningModal
						title="Remove profile"
						bodyText="Removed profile will be deleted permenantly and won’t be available anymore."
						onCancel={() => {
							setSelectedProfile(null);
							setShowDeleteModal(false);
						}}
						onClose={() => {
							setSelectedProfile(null);
							setShowDeleteModal(false);
						}}
						selectedProfile={selectedProfile}
						onRemoveProfile={() => {
							setSelectedProfile(null);
							onDetailsUpdated();
						}}
					/>
				</Modal>
			) : null}
			{showAddModal ? (
				<Modal
					handleClose={() => {
						setSelectedProfile(null);
						setShowAddModal(false);
					}}
					show={showAddModal}
				>
					<AddEditProfileModal
						title="Create Profile"
						fields={selectedProfile ? selectedProfile : {}}
						onClose={() => {
							setSelectedProfile(null);
							setShowAddModal(false);
						}}
						onUpdateProfile={() => {
							setSelectedProfile(null);
							onDetailsUpdated();
						}}
						onAddProfile={() => {
							setSelectedProfile(null);
							onDetailsUpdated();
						}}
						isEdit={selectedProfile ? true : false}
					/>
				</Modal>
			) : null}
		</>
	);
}

export default withRouter(Profile);
