import { createSlice } from '@reduxjs/toolkit';
import { fetchProfiles } from '../thunks/fetchProfiles';
import { addProfile } from '../thunks/addProfile';
import { removeProfile } from '../thunks/removeProfile';

const profilesSlice = createSlice({
	name: 'profiles',
	initialState: {
		isLoading: true,
		data: { profiles: [], size: 0 },
		error: null,
	},
	extraReducers(builder) {
		builder.addCase(fetchProfiles.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchProfiles.fulfilled, (state, action) => {
			if (action.payload?.isInfinite) {
				state.data.profiles.push(...action.payload.getAllProfiles.profiles);
				state.data.size = action.payload.getAllProfiles.size;
			} else {
				state.data.profiles = action.payload.getAllProfiles.profiles;
				state.data.size = action.payload.getAllProfiles.size;
			}
			state.isLoading = false;
		});
		builder.addCase(fetchProfiles.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error;
		});

		/* builder.addCase(addProfile.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(addProfile.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data.push(action.payload);
		});
		builder.addCase(addProfile.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error;
		});

		builder.addCase(removeProfile.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(removeProfile.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = state.data.filter((user) => {
				return user.id !== action.payload.id;
			});
		});
		builder.addCase(removeProfile.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error;
		}); */
	},
});

export const profilesReducer = profilesSlice.reducer;
