import { createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../../services/graphQlServices';
import { getProfileByIdQuery } from '../queries/profileQueries';

const fetchProfileById = createAsyncThunk('profiles/fetchById', async (arg, thunkAPI) => {
	const response = await Service.query(getProfileByIdQuery, arg);

	return response.data;
});

export { fetchProfileById };
