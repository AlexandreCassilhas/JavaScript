import axios from 'axios';

export const inAxios = axios.create({baseURL: 'http://localhost:3001/'})
// Aqui é informada a URL do WebService que será utilizado para interagir com o SGBD.