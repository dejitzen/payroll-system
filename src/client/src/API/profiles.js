import request from "./request";

export const getAllProfiles = async (type = null) => {
    let data;
    try {
        data = await request(null, `/profiles?${type ? `type=${type}` : ''}`, 'get')
        return data
    } catch (error) {
        return { error }
    }
}
export const getUser = async () => {
    let data;
    try {
        data = await request(null, `/profile`, 'get')
        return data
    } catch (error) {
        return { error }
    }
}