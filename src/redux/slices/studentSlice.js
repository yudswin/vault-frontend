import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: '',
    studentID: '',
    phone: '',
    password: '',
    confirmPassword: '',
    email: '',
    accessToken: '',
    refeshToken: '',
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        updateStudent: (state, action) => {
            const { firstName = '', lastName = '', studentID = '', phone = '', password = '', confirmPassword = '', email = '', accessToken = '', refeshToken = '' } = action.payload
            state.firstName = firstName ? firstName : state.firstName;
            state.lastName = lastName ? lastName : state.lastName;
            state.studentID = studentID ? studentID : state.studentID;
            state.phone = phone ? phone : state.phone;
            state.password = password ? password : state.password;
            state.confirmPassword = confirmPassword ? confirmPassword : state.confirmPassword;
            state.email = email ? email : state.email;
            state.accessToken = accessToken ? accessToken : state.accessToken;
            state.refeshToken = refeshToken ? refeshToken : state.refeshToken;
        },
        resetStudent: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.studentID = '';
            state.phone = '';
            state.password = '';
            state.confirmPassword = '';
            state.email = '';
            state.accessToken = '';
            state.refeshToken = '';
        },
    }
});

export const { updateStudent, resetStudent } = studentSlice.actions;

export default studentSlice.reducer;