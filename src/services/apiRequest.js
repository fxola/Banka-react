const makeRequest = async (endpoint, options) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}${endpoint}`, options);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
export default makeRequest;
