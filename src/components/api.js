import axios from 'axios';
const BASE_URL = 'https://nc-knews1.herokuapp.com/api';

export const getUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

export const addUser = data => {
  return axios.post(`${BASE_URL}/users`, data);
};

export const getTopics = () => {
  return axios.get(`${BASE_URL}/topics`);
};

export const addTopic = data => {
  return axios.post(`${BASE_URL}/topics`, data);
};

export const getArticles = () => {
  return axios.get(`${BASE_URL}/articles`);
};

export const addArticle = data => {
  return axios.post(`${BASE_URL}/articles`, data);
};
