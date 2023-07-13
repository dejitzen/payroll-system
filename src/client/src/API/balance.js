import request from "./request";

export const topUpBalance = async (userId, amount) => {
    let data;
    try {
        data = await request({ amount }, `/balances/deposit/${userId}`, 'post')
        return data
    } catch (error) {
        return { error }
    }
}