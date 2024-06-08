import axios from "axios"

export const axiosJWT = axios.create()
const API_URL = 'https://echecking-backend.onrender.com/api'

// export const getAll = async (data) => {
//     const res = await axiosJWT.get(`${API_URL}/course/getAll/${lecturerId}`, {
//         headers: {
//             token: `Bearer ${accessToken}`,
//         }
//     })
//     return res.data
// }

export const createNormal = async (sessionId, data) => {
    const res = await axios.post(`${API_URL}/record/createNormal/${sessionId}`, data)
    return res.data
}

export const getTotal = async (sessionId) => {
    const res = await axios.get(`${API_URL}/record/total/${sessionId}`)
    return res.data
}