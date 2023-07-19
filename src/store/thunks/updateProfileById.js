import { createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../../services/graphQlServices';
import { updateProfileMutation } from '../queries/profileQueries';

const updateProfile = createAsyncThunk('profiles/update', async (arg, thunkAPI) => {
	const response = await Service.mutation(updateProfileMutation, arg);

	return response.data;
});

export { updateProfile };
