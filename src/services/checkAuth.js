import decode from 'jwt-decode';
export const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return false;
  try {
    const { exp } = decode(user.token);
    if (exp < new Date().getTime() / 1000) return false;
  } catch (error) {
    return false;
  }
  return true;
};
