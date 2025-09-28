const API_BASE_URL = '/api';


async function apiDefaultRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}


export const filmAPI = {
  
  getTop5RentedFilms: () => apiDefaultRequest('/films/top5rentedfilms'),
  
};




