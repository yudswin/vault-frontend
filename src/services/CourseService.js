import axios from "axios"

export const axiosJWT = axios.create()
const API_URL = 'https://echecking-backend.onrender.com/api'

export const getAll = async (id, accessToken) => {
    const res = await axiosJWT.get(`${API_URL}/course/getAll/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const create = async (data, accessToken, id) => {
    const res = await axiosJWT.post(`${API_URL}/course/create/${id}`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}


export const getCourseName = async (id) => {
    const res = await axios.get(`${API_URL}/course/getCourseName/${id}`)
    return res.data
}

export const getDetails = async (id, accessToken) => {
    const res = await axiosJWT.get(`${API_URL}/course/getDetails/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const deleteCourse = async (id, accessToken) => {
    const res = await axiosJWT.delete(`${API_URL}/course/delete/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}