/* istanbul ignore file */
import decode from 'jwt-decode';
export const checkAuth = accessLevel => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return false;
  try {
    const { exp, type, isAdmin } = decode(user.token);
    if (accessLevel === 0 && type === 'staff') return false;
    if (accessLevel === 1 && type === 'client') return false;
    if (accessLevel === 1 && !isAdmin) return false;
    if (exp < new Date().getTime() / 1000) return false;
  } catch (error) {
    return false;
  }
  return true;
};
