import { createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../../services/graphQlServices';
import { addProfileMutation } from '../queries/profileQueries';

const addProfile = createAsyncThunk('profiles/add', async (arg, thunkAPI) => {
	const response = await Service.mutation(addProfileMutation, arg);

	return response.data;
});

export { addProfile };
