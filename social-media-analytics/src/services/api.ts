import axios from "axios";

const API_BASE_URL = "/evaluation-service"; // Ensure leading "/"

export const fetchUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.users;
};

export const fetchPostsByUser = async (userId: number) => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`);
    return response.data.posts;
};

export const fetchCommentsByPost = async (postId: number) => {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
    return response.data.comments;
};
