import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProfiles } from '../../store';
import { useThunk } from '../../hooks/use-thunk';
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
import useDebounce from '../../hooks/useDebounce';
import ProfilesTableRow from '../components/profilesTableRow';
import _ from 'lodash';
import TableContainer from '../components/tableContainer';

function Profile() {
	const [doFetchProfiles, isLoadingProfiles, loadingProfilesError] = useThunk(fetchProfiles);
	const { profiles, size } = useSelector((state) => {
		return state.profiles.data;
	});

	const { debounce } = useDebounce();

	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [sortBy, setSortBy] = useState('is_verified');
	const [sortOrder, setSortOrder] = useState(-1);
	const [fetchingMore, setFetchingMore] = useState(false);
	const [rows, setRows] = useState(16);
	const [selectedProfile, setSelectedProfile] = useState({});

	const [view, setView] = useState('card');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);

	const headers = [
		{ name: 'Name', key: 'is_verified', isSortable: true },
		{ name: 'ID', key: 'id', isSortable: false },
		{ name: 'Email', key: 'email', isSortable: true },
		{ name: 'description', key: 'description', isSortable: false },
	];

	const handleWindowResize = (event) => {
		// Get width and height of the window excluding scrollbars
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;

		if (w <= 768) {
			handleChangeView('card');
		} else if (w > 768) {
			handleChangeView('table');
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, [handleWindowResize]);

	useEffect(() => {
		doFetchProfiles({
			variables: {
				orderBy: {
					key: sortBy,
					sort: sortOrder === -1 ? 'desc' : 'asc',
				},
				rows: rows,
				page: page,
				searchString: search,
			},
			isInfinite: view === 'card',
		});
	}, [doFetchProfiles]);

	const handleAddProfile = () => {
		setShowAddModal(true);
	};

	const handleSearchFetch = (e) => {
		setFetchingMore(true);
		doFetchProfiles({
			variables: {
				orderBy: {
					key: sortBy,
					sort: sortOrder === -1 ? 'desc' : 'asc',
				},
				rows: rows,
				page: 0,
				searchString: e.target.value,
			},
			isInfinite: false,
		});
	};

	const handleOnSearch = (e) => {
		setSearch(() => {
			debounce(handleSearchFetch(e), 500);
			return e.target.value;
		});
	};

	const fetchMore = () => {
		setFetchingMore(true);
		doFetchProfiles({
			variables: {
				orderBy: {
					key: sortBy,
					sort: sortOrder === -1 ? 'desc' : 'asc',
				},
				rows: rows,
				page: page + 1,
				searchString: search,
			},
			isInfinite: view === 'card',
		});
		setPage(page + 1);
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
		setFetchingMore(true);

		doFetchProfiles({
			variables: {
				orderBy: {
					key: sortBy,
					sort: sortOrder === -1 ? 'desc' : 'asc',
				},
				rows: view === 'table' ? 10 : 16,
				page: 0,
				searchString: search,
			},
			isInfinite: false,
		});
		if (view === 'table') {
			setRows(10);
		} else {
			setRows(16);
		}
		setView(view);
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

		setFetchingMore(true);
		doFetchProfiles({
			variables: {
				orderBy: {
					key: sBy,
					sort: sOrder === -1 ? 'desc' : 'asc',
				},
				rows: rows,
				page: 0,
				searchString: search,
			},
			isInfinite: false,
		});
	};

	const onClickChangeRows = (value) => {
		setFetchingMore(true);

		doFetchProfiles({
			variables: {
				orderBy: {
					key: sortBy,
					sort: sortOrder === -1 ? 'desc' : 'asc',
				},
				rows: value,
				page: 0,
				searchString: search,
			},
			isInfinite: false,
		});
		setRows(value);
	};

	const fetchPrev = () => {
		if (page > 0) {
			setFetchingMore(true);

			doFetchProfiles({
				variables: {
					orderBy: {
						key: sortBy,
						sort: sortOrder === -1 ? 'desc' : 'asc',
					},
					rows: rows,
					page: page - 1,
					searchString: search,
				},
				isInfinite: false,
			});
			setPage((page) => page - 1);
		}
	};

	const fetchNext = () => {
		if (page * rows + rows < size) {
			setFetchingMore(true);

			doFetchProfiles({
				variables: {
					orderBy: {
						key: sortBy,
						sort: sortOrder === -1 ? 'desc' : 'asc',
					},
					rows: rows,
					page: page + 1,
					searchString: search,
				},
				isInfinite: false,
			});
			setPage((page) => page + 1);
		}
	};

	if (!fetchingMore && isLoadingProfiles) {
		return;
	}

	return (
		<>
			<ActionsContainer>
				<SearchBar value={search} onChange={(e) => handleOnSearch(e)} />
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
			{view === 'card' ? (
				<div className="vn-infinite-container">
					<InfiniteScrollComponent
						dataLength={_.size(profiles)}
						next={fetchMore}
						hasMore={_.size(profiles) < (size ? size : 0)}
					>
						{_.map(profiles, (profile, index) => {
							return (
								<Card
									key={profile.id + index}
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
					size={size}
					sortBy={sortBy}
					sortOrder={sortOrder}
					fetchPrev={fetchPrev}
					fetchNext={fetchNext}
				>
					{_.map(profiles, (profile, index) => {
						return (
							<ProfilesTableRow
								key={profile.id + index}
								profile={profile}
								onClickMore={handleClickMore}
							/>
						);
					})}
				</TableContainer>
			)}
			{showDeleteModal ? (
				<Modal handleClose={() => setShowDeleteModal(false)} show={showDeleteModal}>
					<DeleteWarningModal
						title="Remove profile"
						bodyText="Removed profile will be deleted permenantly and won’t be available anymore."
						onCancel={() => setShowDeleteModal(false)}
						onClose={() => setShowDeleteModal(false)}
						selectedProfile={selectedProfile}
					/>
				</Modal>
			) : null}
			{showAddModal ? (
				<Modal handleClose={() => setShowAddModal(false)} show={showAddModal}>
					<AddEditProfileModal
						title="Create Profile"
						fields={selectedProfile ? selectedProfile : {}}
						onClose={() => {
							setShowAddModal(false);
						}}
						isEdit={selectedProfile ? true : false}
					/>
				</Modal>
			) : null}
		</>
	);
}

export default withRouter(Profile);
