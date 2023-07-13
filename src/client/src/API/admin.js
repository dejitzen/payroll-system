import request from "./request";

export const getBestProffession = async (start, end) => {
    let data;
    try {
        data = await request(null, `/admin/best-profession?start=${start}&end=${end}`, 'get')
        return data
    } catch (error) {
        return { error }
    }
}
export const getBestClients = async (start, end) => {
    let data;
    try {
        data = await request(null, `/admin/best-clients?start=${start}&end=${end}&limit=4`, 'get')
        return data
    } catch (error) {
        return { error }
    }
}