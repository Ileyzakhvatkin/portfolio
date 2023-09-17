import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default async function loadCategories(deliveryId) {
  this.paymentsData = (await axios.get(`${API_BASE_URL}/api/payments?deliveryTypeId=${deliveryId}`)).data;
}
