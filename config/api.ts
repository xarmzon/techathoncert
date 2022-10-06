import axios from "axios";
import { BASE_URL } from "config";
export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});
