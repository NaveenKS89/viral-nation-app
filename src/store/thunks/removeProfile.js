import { createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../../services/graphQlServices';
import { removeProfileMutation } from '../queries/profileQueries';

const removeProfile = createAsyncThunk('profiles/remove', async (arg, thunkAPI) => {
	const response = await Service.mutation(removeProfileMutation, arg);

	return response.data;
});

export { removeProfile };
