import axios from 'axios';

const API_URL = axios.create({ baseURL: 'http://localhost:9998' });

// lay toan bo category
export const getCategories = () => API_URL.get('/Category');
// lay toan bo san pham
export const getProducts = () => API_URL.get('/Product');

// xoa san pham
export const removeProduct = (id) => API_URL.delete(`/Product/${id}`);// dung dau nhay khac nhau de truyen tham so

// them san pham
export const addProduct = (product) => API_URL.post('/Product', product);

// get san pham theo id
export const getProductById = (id) => API_URL.get(`/Product/${id}`);

// cap nhat san pham
export const updateProduct = (id, product) => API_URL.put(`/Product/${id}`, product);
