import { configureStore } from '@reduxjs/toolkit';
import { profilesReducer } from './slices/profilesSlice';

export const store = configureStore({
	reducer: {
		profiles: profilesReducer,
	},
});

export * from './thunks/fetchProfiles';
export * from './thunks/updateProfileById';
export * from './thunks/addProfile';
export * from './thunks/removeProfile';
export * from './thunks/getProfileById';
