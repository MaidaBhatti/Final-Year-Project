import API from './api';

export const getProfile = () => {
  return API.get('/users/me');
};

export const updateProfile = (data) => {
  return API.put('/users/me', data);
};

const userService = {
  getProfile,
  updateProfile
};

export default userService;