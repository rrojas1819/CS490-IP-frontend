export const testData = {
  topRentedMovie: {
    title: 'The Godfather',
    imageUrl: 'https://via.placeholder.com/300x450/2c3e50/ffffff?text=The+Godfather',
    rentings: 1250000,
    year: 1972,
    genre: 'Crime, Drama'
  },

  // Top 5 rented movies from hypothetical SQL query
  top5RentedMovies: [
    { title: 'The Godfather', imageUrl: 'https://via.placeholder.com/300x450/2c3e50/ffffff?text=The+Godfather', rentings: 1250000, year: 1972, genre: 'Crime, Drama' },
    { title: 'The Shawshank Redemption', imageUrl: 'https://via.placeholder.com/300x450/34495e/ffffff?text=Shawshank', rentings: 930000, year: 1994, genre: 'Drama' },
    { title: 'The Dark Knight', imageUrl: 'https://via.placeholder.com/300x450/7f8c8d/ffffff?text=Dark+Knight', rentings: 900000, year: 2008, genre: 'Action' },
    { title: 'Pulp Fiction', imageUrl: 'https://via.placeholder.com/300x450/95a5a6/ffffff?text=Pulp+Fiction', rentings: 890000, year: 1994, genre: 'Crime' },
    { title: 'The Lord of the Rings: The Return of the King', imageUrl: 'https://via.placeholder.com/300x450/8e44ad/ffffff?text=LOTR', rentings: 890000, year: 2003, genre: 'Fantasy' }
  ],

  categories: [
    {
      name: 'Long',
      movies: [
        { title: 'The Lord of the Rings: The Return of the King', imageUrl: 'https://via.placeholder.com/150/8e44ad/ffffff?text=LOTR', rentings: 890000, year: 2003, duration: '201 min' },
        { title: 'Titanic', imageUrl: 'https://via.placeholder.com/150/3498db/ffffff?text=Titanic', rentings: 780000, year: 1997, duration: '194 min' },
        { title: 'Avatar', imageUrl: 'https://via.placeholder.com/150/27ae60/ffffff?text=Avatar', rentings: 780000, year: 2009, duration: '162 min' },
        { title: 'Interstellar', imageUrl: 'https://via.placeholder.com/150/e74c3c/ffffff?text=Interstellar', rentings: 860000, year: 2014, duration: '169 min' }
      ]
    },
    {
      name: 'Short',
      movies: [
        { title: 'The Lion King', imageUrl: 'https://via.placeholder.com/150/f39c12/ffffff?text=Lion+King', rentings: 850000, year: 1994, duration: '88 min' },
        { title: 'Toy Story', imageUrl: 'https://via.placeholder.com/150/9b59b6/ffffff?text=Toy+Story', rentings: 830000, year: 1995, duration: '81 min' },
        { title: 'Finding Nemo', imageUrl: 'https://via.placeholder.com/150/1abc9c/ffffff?text=Finding+Nemo', rentings: 810000, year: 2003, duration: '100 min' },
        { title: 'Up', imageUrl: 'https://via.placeholder.com/150/e67e22/ffffff?text=Up', rentings: 820000, year: 2009, duration: '96 min' }
      ]
    },
    {
      name: 'Rented One',
      movies: [
        { title: 'The Shawshank Redemption', imageUrl: 'https://via.placeholder.com/150/34495e/ffffff?text=Shawshank', rentings: 930000, year: 1994, duration: '142 min' },
        { title: 'The Godfather', imageUrl: 'https://via.placeholder.com/150/2c3e50/ffffff?text=Godfather', rentings: 920000, year: 1972, duration: '175 min' },
        { title: 'The Dark Knight', imageUrl: 'https://via.placeholder.com/150/7f8c8d/ffffff?text=Dark+Knight', rentings: 900000, year: 2008, duration: '152 min' },
        { title: 'Pulp Fiction', imageUrl: 'https://via.placeholder.com/150/95a5a6/ffffff?text=Pulp+Fiction', rentings: 890000, year: 1994, duration: '154 min' }
      ]
    },
    {
      name: 'Action',
      movies: [
        { title: 'The Matrix', imageUrl: 'https://via.placeholder.com/150/2980b9/ffffff?text=Matrix', rentings: 870000, year: 1999, duration: '136 min' },
        { title: 'Mad Max: Fury Road', imageUrl: 'https://via.placeholder.com/150/e67e22/ffffff?text=Mad+Max', rentings: 750000, year: 2015, duration: '120 min' },
        { title: 'John Wick', imageUrl: 'https://via.placeholder.com/150/16a085/ffffff?text=John+Wick', rentings: 720000, year: 2014, duration: '101 min' },
        { title: 'Mission: Impossible', imageUrl: 'https://via.placeholder.com/150/d35400/ffffff?text=Mission', rentings: 710000, year: 1996, duration: '110 min' }
      ]
    },
    {
      name: 'Comedy',
      movies: [
        { title: 'The Hangover', imageUrl: 'https://via.placeholder.com/150/f39c12/ffffff?text=Hangover', rentings: 680000, year: 2009, duration: '100 min' },
        { title: 'Superbad', imageUrl: 'https://via.placeholder.com/150/9b59b6/ffffff?text=Superbad', rentings: 650000, year: 2007, duration: '113 min' },
        { title: 'Anchorman', imageUrl: 'https://via.placeholder.com/150/1abc9c/ffffff?text=Anchorman', rentings: 620000, year: 2004, duration: '94 min' },
        { title: 'Step Brothers', imageUrl: 'https://via.placeholder.com/150/e74c3c/ffffff?text=Step+Brothers', rentings: 600000, year: 2008, duration: '98 min' }
      ]
    },
    {
      name: 'Horror',
      movies: [
        { title: 'The Exorcist', imageUrl: 'https://via.placeholder.com/150/8e44ad/ffffff?text=Exorcist', rentings: 580000, year: 1973, duration: '122 min' },
        { title: 'Halloween', imageUrl: 'https://via.placeholder.com/150/27ae60/ffffff?text=Halloween', rentings: 560000, year: 1978, duration: '91 min' },
        { title: 'A Nightmare on Elm Street', imageUrl: 'https://via.placeholder.com/150/2c3e50/ffffff?text=Elm+Street', rentings: 540000, year: 1984, duration: '91 min' },
        { title: 'The Conjuring', imageUrl: 'https://via.placeholder.com/150/34495e/ffffff?text=Conjuring', rentings: 520000, year: 2013, duration: '112 min' }
      ]
    },
    {
      name: 'Sci-Fi',
      movies: [
        { title: 'Blade Runner', imageUrl: 'https://via.placeholder.com/150/7f8c8d/ffffff?text=Blade+Runner', rentings: 500000, year: 1982, duration: '117 min' },
        { title: 'Alien', imageUrl: 'https://via.placeholder.com/150/95a5a6/ffffff?text=Alien', rentings: 480000, year: 1979, duration: '117 min' },
        { title: 'The Terminator', imageUrl: 'https://via.placeholder.com/150/8e44ad/ffffff?text=Terminator', rentings: 460000, year: 1984, duration: '107 min' },
        { title: 'Back to the Future', imageUrl: 'https://via.placeholder.com/150/3498db/ffffff?text=Back+Future', rentings: 440000, year: 1985, duration: '116 min' }
      ]
    }
  ],

  // Top 5 actors from hypothetical SQL query
  top5Actors: [
    { name: 'Tom Hanks', imageUrl: 'https://via.placeholder.com/150/2c3e50/ffffff?text=Tom+Hanks', movieCount: 15, totalRentings: 4200000, mostPopularMovie: 'Forrest Gump' },
    { name: 'Leonardo DiCaprio', imageUrl: 'https://via.placeholder.com/150/34495e/ffffff?text=Leo', movieCount: 12, totalRentings: 3800000, mostPopularMovie: 'Titanic' },
    { name: 'Robert De Niro', imageUrl: 'https://via.placeholder.com/150/7f8c8d/ffffff?text=De+Niro', movieCount: 18, totalRentings: 3600000, mostPopularMovie: 'Goodfellas' },
    { name: 'Morgan Freeman', imageUrl: 'https://via.placeholder.com/150/95a5a6/ffffff?text=Morgan', movieCount: 14, totalRentings: 3400000, mostPopularMovie: 'Shawshank' },
    { name: 'Al Pacino', imageUrl: 'https://via.placeholder.com/150/8e44ad/ffffff?text=Pacino', movieCount: 16, totalRentings: 3200000, mostPopularMovie: 'The Godfather' }
  ],

  allMovies: [
    { title: 'The Godfather', imageUrl: 'https://via.placeholder.com/150/2c3e50/ffffff?text=Godfather', rentings: 1250000, year: 1972, actors: ['Marlon Brando', 'Al Pacino', 'James Caan'], genre: 'Crime' },
    { title: 'The Shawshank Redemption', imageUrl: 'https://via.placeholder.com/150/34495e/ffffff?text=Shawshank', rentings: 930000, year: 1994, actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'], genre: 'Drama' },
    { title: 'The Dark Knight', imageUrl: 'https://via.placeholder.com/150/7f8c8d/ffffff?text=Dark+Knight', rentings: 900000, year: 2008, actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'], genre: 'Action' },
    { title: 'Pulp Fiction', imageUrl: 'https://via.placeholder.com/150/95a5a6/ffffff?text=Pulp+Fiction', rentings: 890000, year: 1994, actors: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'], genre: 'Crime' },
    { title: 'The Lord of the Rings: The Return of the King', imageUrl: 'https://via.placeholder.com/150/8e44ad/ffffff?text=LOTR', rentings: 890000, year: 2003, actors: ['Elijah Wood', 'Viggo Mortensen', 'Ian McKellen'], genre: 'Fantasy' },
    { title: 'Titanic', imageUrl: 'https://via.placeholder.com/150/3498db/ffffff?text=Titanic', rentings: 780000, year: 1997, actors: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'], genre: 'Romance' },
    { title: 'Avatar', imageUrl: 'https://via.placeholder.com/150/27ae60/ffffff?text=Avatar', rentings: 780000, year: 2009, actors: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'], genre: 'Sci-Fi' },
    { title: 'Interstellar', imageUrl: 'https://via.placeholder.com/150/e74c3c/ffffff?text=Interstellar', rentings: 860000, year: 2014, actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'], genre: 'Sci-Fi' },
    { title: 'The Lion King', imageUrl: 'https://via.placeholder.com/150/f39c12/ffffff?text=Lion+King', rentings: 850000, year: 1994, actors: ['Matthew Broderick', 'Jeremy Irons', 'James Earl Jones'], genre: 'Animation' },
    { title: 'Toy Story', imageUrl: 'https://via.placeholder.com/150/9b59b6/ffffff?text=Toy+Story', rentings: 830000, year: 1995, actors: ['Tom Hanks', 'Tim Allen', 'Don Rickles'], genre: 'Animation' },
    { title: 'Finding Nemo', imageUrl: 'https://via.placeholder.com/150/1abc9c/ffffff?text=Finding+Nemo', rentings: 810000, year: 2003, actors: ['Albert Brooks', 'Ellen DeGeneres', 'Alexander Gould'], genre: 'Animation' },
    { title: 'Up', imageUrl: 'https://via.placeholder.com/150/e67e22/ffffff?text=Up', rentings: 820000, year: 2009, actors: ['Ed Asner', 'Christopher Plummer', 'Jordan Nagai'], genre: 'Animation' },
    { title: 'Forrest Gump', imageUrl: 'https://via.placeholder.com/150/16a085/ffffff?text=Forrest+Gump', rentings: 880000, year: 1994, actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'], genre: 'Drama' },
    { title: 'The Matrix', imageUrl: 'https://via.placeholder.com/150/2980b9/ffffff?text=Matrix', rentings: 870000, year: 1999, actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'], genre: 'Sci-Fi' },
    { title: 'Goodfellas', imageUrl: 'https://via.placeholder.com/150/d35400/ffffff?text=Goodfellas', rentings: 870000, year: 1990, actors: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'], genre: 'Crime' },
    { title: 'The Silence of the Lambs', imageUrl: 'https://via.placeholder.com/150/8e44ad/ffffff?text=Silence', rentings: 860000, year: 1991, actors: ['Jodie Foster', 'Anthony Hopkins', 'Scott Glenn'], genre: 'Thriller' },
    { title: 'Saving Private Ryan', imageUrl: 'https://via.placeholder.com/150/27ae60/ffffff?text=Saving+Ryan', rentings: 860000, year: 1998, actors: ['Tom Hanks', 'Matt Damon', 'Tom Sizemore'], genre: 'War' },
    { title: 'The Green Mile', imageUrl: 'https://via.placeholder.com/150/2c3e50/ffffff?text=Green+Mile', rentings: 860000, year: 1999, actors: ['Tom Hanks', 'Michael Clarke Duncan', 'David Morse'], genre: 'Drama' },
    { title: 'The Prestige', imageUrl: 'https://via.placeholder.com/150/34495e/ffffff?text=Prestige', rentings: 850000, year: 2006, actors: ['Hugh Jackman', 'Christian Bale', 'Scarlett Johansson'], genre: 'Thriller' },
    { title: 'The Departed', imageUrl: 'https://via.placeholder.com/150/7f8c8d/ffffff?text=Departed', rentings: 850000, year: 2006, actors: ['Leonardo DiCaprio', 'Matt Damon', 'Jack Nicholson'], genre: 'Crime' }
  ]
}
