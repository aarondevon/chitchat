/* eslint-disable no-else-return */
/* eslint-disable no-undef */
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: $`Bearer {user.accessToken}` };
  } else {
    return {};
  }
}
