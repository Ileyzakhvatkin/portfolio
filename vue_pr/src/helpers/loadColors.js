import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default async function loadColors() {
  this.colorsData = (await axios.get(`${API_BASE_URL}/api/colors`)).data;
}
