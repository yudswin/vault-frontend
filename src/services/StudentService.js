import axios from "axios"

export const axiosJWT = axios.create()
const API_URL = 'https://echecking-backend.onrender.com/api'

export const loginUser = async (data) => {
    const res = await axios.post(`${API_URL}/student/signin`, data)
    return res.data
}

export const getDetailStudent = async (id, accessToken) => {
    const res = await axiosJWT.get(`${API_URL}/student/getDetails/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const getAllStudents = async () => {
    const res = await axios.get(`${API_URL}/student/getAll`)
    return res.data
}

export const refreshToken = async (data) => {
    const res = await axios.post(`${API_URL}/student/refreshToken`, data)
    return res.data
}

export const forgotPassword = async (email) => {
    const res = await axios.post(`${API_URL}/student/forgotPassword`, email)
    return res.data
}

export const verifyOTP = async (data) => {
    const res = await axios.post(`${API_URL}/student/verifyOtp`, data)
    return res.data
}

export const changePassword = async (data) => {
    const res = await axios.post(`${API_URL}/student/changePassword`, data)
    return res.data
}