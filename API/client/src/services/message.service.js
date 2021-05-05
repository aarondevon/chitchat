import axios from 'axios';
import authHeader from './auth-header';

const getMessages = async () => {
  const response = await axios.get('/api/messages', { headers: authHeader() });

  return response.data;
};

const sendMessage = async (event, message, currentUser) => {
  event.preventDefault();

  try {
    await axios({
      method: 'post',
      headers: authHeader(),
      url: 'api/messages',
      data: {
        message,
        user: {
          id: currentUser.userId,
          userName: currentUser.username,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export default {
  getMessages,
  sendMessage,
};
