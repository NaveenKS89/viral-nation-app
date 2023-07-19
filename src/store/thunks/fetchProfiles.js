import { createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../../services/graphQlServices';
import { getProfilesQuery } from '../queries/profileQueries';

const fetchProfiles = createAsyncThunk('profiles/fetch', async (arg, thunkAPI) => {
	const response = await Service.query(getProfilesQuery, arg.variables);

	return { ...response.data, isInfinite: arg.isInfinite };
});

export { fetchProfiles };
