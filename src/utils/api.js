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
  getFilmGroupGenre: () => apiDefaultRequest('/films/filmgroupgenre'),
  getFilmById: (filmId) => apiDefaultRequest(`/films/filmdetails?film_id=${filmId}`),
  searchFilmsByTitle: (title) => apiDefaultRequest(`/films/search/filmsbytitle?title=${encodeURIComponent(title)}`),
  searchFilmsByGenre: (genre) => apiDefaultRequest(`/films/search/filmsbygenre?genre=${encodeURIComponent(genre)}`),
};

export const actorAPI = {
  
  getTop5Actors: () => apiDefaultRequest('/actors/top5actors'),
  searchFilmsByActorName: (name) => apiDefaultRequest(`/actors/search/filmsbyactorname?name=${encodeURIComponent(name)}`),
  
};

export const customerAPI = {
  rentFilm: (filmId, customerId) => apiDefaultRequest(`/customers/rentfilm?film_id=${filmId}&customer_id=${customerId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  
  returnFilm: (rentalId, customerId, inventoryId) => apiDefaultRequest(`/customers/returnfilm?rental_id=${rentalId}&customer_id=${customerId}&inventory_id=${inventoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
};



