import axios from "axios";
import { API_URL } from "./settings";

const api = {
  createDog: dog => axios.post(`${API_URL}/dogs`, dog),
  editDog: dog => axios.patch(`${API_URL}/dogs/${dog.id}`, dog),
  getDogs: () => axios.get(`${API_URL}/dogs`),
  removeDog: dogID => axios.delete(`${API_URL}/dogs/${dogID}`),

  createUser: user => axios.post(`${API_URL}/users`, user),
  editUser: user => axios.patch(`${API_URL}/users/${user.id}`, user),
  getUsers: () => axios.get(`${API_URL}/users`),
  userLogIn: (name, password) =>
    axios.post(`${API_URL}/users/login`, { name, password }),

  createWalkingSchedule: record =>
    axios.post(`${API_URL}/walking-schedule`, record),
  getWalkingSchedule: () => axios.get(`${API_URL}/walking-schedule`),
  removeWalkingScheduleByDog: dogID =>
    axios.delete(`${API_URL}/walking-schedule/dog/${dogID}`),
  removeWalkingScheduleRecord: recordID =>
    axios.delete(`${API_URL}/walking-schedule/${recordID}`)
};

export default api;
