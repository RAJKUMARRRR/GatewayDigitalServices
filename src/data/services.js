import axios from './axios';

export const getRequest = (url)=>axios.get(url);
export const postRequest = (url,body)=>axios.post(url,body);
export const putRequest = (url,body)=>axios.put(url,body);
export const deleteRequest = (url)=>axios.delete(url);