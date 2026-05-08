import api from "../../../services/api"

export async function loginUser (data) {
    const response = await api.post("/users/login/", data ) 
    return  response.data 
}