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