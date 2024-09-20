import axios from 'axios';

export const fetchTickets = () => {
  return axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
};
