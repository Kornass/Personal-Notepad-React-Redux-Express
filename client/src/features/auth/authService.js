import axios from "axios";
const API_URL = "https://personal-notepad-react-redux.vercel.app/api/users";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => localStorage.removeItem("user");

const authService = {
  register,
  logout,
  login,
};

export default authService;
