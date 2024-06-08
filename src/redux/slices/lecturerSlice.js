import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: '',
    lecturerID: '',
    phone: '',
    lecturerPassword: '',
    confirmLecturerPassword: '',
    email: '',
    accessToken: '',
    refreshToken: '',
}

export const lecturerSlice = createSlice({
    name: 'lecturer',
    initialState,
    reducers: {
        updateLecturer: (state, action) => {
            const { firstName = '', lastName = '', lecturerID = '', phone = '', lecturerPassword = '', confirmLecturerPassword = '', email = '', accessToken = '', refreshToken = '' } = action.payload
            state.firstName = firstName ? firstName : state.firstName;
            state.lastName = lastName ? lastName : state.lastName;
            state.lecturerID = lecturerID ? lecturerID : state.lecturerID;
            state.phone = phone ? phone : state.phone;
            state.lecturerPassword = lecturerPassword ? lecturerPassword : state.lecturerPassword;
            state.confirmLecturerPassword = confirmLecturerPassword ? confirmLecturerPassword : state.confirmLecturerPassword;
            state.email = email ? email : state.email;
            state.accessToken = accessToken ? accessToken : state.accessToken;
            state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
        },
        resetLecturer: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.lecturerID = '';
            state.phone = '';
            state.lecturerPassword = '';
            state.confirmLecturerPassword = '';
            state.email = '';
            state.accessToken = '';
            state.refreshToken = '';
        },
    }
});

export const { updateLecturer, resetLecturer } = lecturerSlice.actions;

export default lecturerSlice.reducer;