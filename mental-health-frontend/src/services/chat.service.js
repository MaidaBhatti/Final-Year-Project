import API from './api';

export const sendChatMessage = async (message) => {
  const response = await API.post('/chatbot', { message });
  return response.data;
};

export default {
  sendChatMessage
};