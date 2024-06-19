import axios from "axios"

export const axiosJWT = axios.create()
const API_URL = 'https://echecking-backend.onrender.com/api'

export const loginUser = async (data) => {
    const res = await axios.post(`${API_URL}/lecturer/signin`, data)
    return res.data
}

export const getDetailLecturer = async (id, accessToken) => {
    const res = await axios.get(`${API_URL}/lecturer/getDetails/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const getAllLecturers = async () => {
    const res = await axios.get(`${API_URL}/lecturer/getAll`)
    return res.data
}

export const refreshToken = async (data) => {
    const res = await axios.post(`${API_URL}/lecturer/refreshToken`, data)
    return res.data
}

export const forgotPassword = async (email) => {
    const res = await axios.post(`${API_URL}/lecturer/forgotPassword`, email)
    return res.data
}

export const verifyOTP = async (data) => {
    const res = await axios.post(`${API_URL}/lecturer/verifyOtp`, data)
    return res.data
}