export const makeRequest = async (endpoint, options) => {
  const response = await fetch(`${process.env.BASE_URL}${endpoint}`, options);
  return await response.json();
};
export default makeRequest;
