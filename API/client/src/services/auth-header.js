/* eslint-disable no-else-return */
/* eslint-disable no-undef */
export default function authHeader() {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: token };
  } else {
    return {};
  }
}
