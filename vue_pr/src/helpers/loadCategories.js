import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default async function loadCategories() {
  this.categoriesData = (await axios.get(`${API_BASE_URL}/api/productCategories`)).data;
}
