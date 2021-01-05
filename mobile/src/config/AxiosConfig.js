// Basic imports
import axios from 'axios';

// TODO: Trocar por valores vindos do .env
export const server = axios.create({
    baseURL: 'http://localhost:3002',
});