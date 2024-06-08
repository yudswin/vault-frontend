import axios from "axios"

export const axiosJWT = axios.create()
const API_URL = 'https://echecking-backend.onrender.com/api'

export const getDetailsByCode = async (code) => {
    const res = await axiosJWT.get(`${API_URL}/attendance/getDetailsByCode/${code}`)
    return res.data
}

export const getAll = async (courseId, accessToken) => {
    const res = await axiosJWT.get(`${API_URL}/attendance/getAll/${courseId}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const create = async (courseId, accessToken, data) => {
    const res = await axiosJWT.post(`${API_URL}/attendance/create/${courseId}`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}