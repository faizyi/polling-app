import { axiosInstance } from "@/axios/axios";


export const getPolls = async () => {
    try {
        const response = await axiosInstance.get("/poll");
        return response;
    } catch (error) {
        throw error;
    }
}

export const createPoll = async (data, user) => {
    console.log(data, user);
    try {
        const response = await axiosInstance.post("/poll/create", data, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const votePoll = async (data) => {
    try {
        const response = await axiosInstance.post(`/poll/votes/${data.pollId}`, { optionIndex: data.optionIndex });
        return response
    } catch (error) {
        throw error;
    }
}