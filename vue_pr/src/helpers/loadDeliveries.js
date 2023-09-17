import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default async function loadCategories() {
  this.deliveriesData = (await axios.get(`${API_BASE_URL}/api/deliveries`)).data;
}
