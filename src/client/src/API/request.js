import axios from "axios";
export const baseURL = `http://localhost:3001`;

const customAxios = axios.create({
    timeout: 130000,
    headers: { "Content-Type": "application/json" },
    validateStatus: (status) => {
        return (status >= 200 && status < 300) || status == 422;
    }
});

export default function HandleRequest(data, resourceName, action) {
    const userId = JSON.parse(localStorage.getItem('user'))?.id

    customAxios.defaults.baseURL = baseURL;
    if (userId) {
        customAxios.defaults.headers = { ...customAxios.defaults.headers, 'profile_id': userId || 0 }
    }

    var config = requestBuilder(data, resourceName, action);
    const request = customAxios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return Promise.reject(error);
        });
    return request;
}
function requestBuilder(payload, resourceName, action) {
    var method = action;

    var request = {
        method: action,
        url: resourceName,
        data: payload
    };
    if (method === "get") {
        delete request.data;
    }

    return request;
}


