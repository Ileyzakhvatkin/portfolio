import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default async function loadCategoryParams() {
  this.categoriesParamsData = (await axios.get(`${API_BASE_URL}/api/productCategories/${this.currentCategoryId}`)).data;
}
