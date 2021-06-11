// global constants
const APIKEY = "0265a71aeb66d28864555dbe7be9968c";
const flixForm = document.querySelector('form');                
const flixArea = document.querySelector('.poster-area');

var currentApiPage = 0;
var currentSearchTerm = '';

const searchBtn = document.querySelector('search-btn');

const searchInput = document.getElementById('search-input');

const showMoreBtn = document.getElementById('show-me-more-btn');

const searchForm = document.getElementById('search-form');

const searchSection = document.getElementById('search-section');

const searchMovieSection = document.getElementById('movie-section');

//1.User can view a list of current movies from The Movie Database API.

//calls function to show the popular movies on reload
window.onload = getResults;

//gets the popular movies                     
async function getResults(event){ 
   event.preventDefault();
    console.log(currentApiPage);
    //for popular movies

    const APIURL = "https://api.themoviedb.org/3/movie/popular?api_key=" + APIKEY + "&language=en-US&page=1" ;
    
    const response = await fetch(APIURL);
    const responseData = await response.json();
    //console.log(responseData);
    const data = responseData.results;

    
    // gets all the movie titles, posters, and ratings
    for (let i = 0; i < data.length; i++){
        let movieTitle = data[i].title;
        // console.log(movieTitle);
        let movieRating = data[i].vote_average;
      //  console.log(movieRating);
        displayResults(data[i]);
    }

    currentApiPage++;
    showMoreBtn.classList.remove('hidden');
    
}

//2. displays all the posters, titles, and ratings

//shows the popular movies chosen         
 function displayResults(element){

    let showPoster = "https://image.tmdb.org/t/p/w500" + element.poster_path;
    let showTitle = element.title;
    let showRating = element.vote_average; 
    
    flixArea.innerHTML += `    
    <div class="movie-area">

        <img src="${showPoster}" alt="${showTitle}">

    <div class="movie-details">

         <p>${showTitle}</p>
         <p>${showRating}</p> 

    </div>
   
    </div>  
        
    `

}

//3. allow users to search movies

async function searchMovies(element){
    element.preventDefault();
    flixArea.innerHTML = ``;
    currentSearchTerm = element.target.movies.value;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${currentSearchTerm}`);    
    const jsonResponse = await response.json();

    let movies = jsonResponse.results.map(element => ({
    id: element.id,
    title: element.title,
    poster_path: element.poster_path,
    vote_average: element.vote_average
    }))
  
    movies.forEach(element => {
        displayResults(element);
    });

    searchInput.value = ``;
    currentApiPage++;

    
    console.log(currentApiPage);
    return movies;
    
}

//lets user search something 
searchForm.addEventListener('submit', searchMovies);


//4.show more button

 async function showMeMoreClick(element){
    //const results = getResults(currentSearchTerm);
    currentApiPage++;
    let apiURL = "https://api.themoviedb.org/3/movie/popular?api_key=" + APIKEY + "&language=en-US&page=" + currentApiPage;

    currentApiPage++;

    let response     = await fetch(apiURL);
    let responseData = await response.json();
    let data = responseData.results;    
    console.log(data);

    let movies = responseData.results.map(element => ({
        id: element.id,
        title: element.title,
        poster_path: element.poster_path,
        vote_average: element.vote_average
        }))

    movies.forEach(element => {
        displayResults(element);
    });  
}

showMoreBtn.addEventListener('click', showMeMoreClick);
