import request from "./request";

export const getUnpaidJobs = async (user_id) => {
    let data;
    try {
        data = await request(null, `/jobs/unpaid?user_id=${user_id}`, 'get')
        return data
    } catch (error) {
        return { error }
    }
}
export const getJobs = async (contractor_id) => {
    let data;
    try {
        data = await request(null, `/jobs?contractor_id=${contractor_id}`, 'get')
        return data
    } catch (error) {
        return { error }
    }
}
export const payJob = async (job_id) => {
    let data;
    try {
        data = await request({}, `/jobs/${job_id}/pay`, 'post')
        return data
    } catch (error) {
        return { error: error.response.data.error }
    }
}