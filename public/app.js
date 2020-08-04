btn = document.querySelector('#searchBtn');
btn.addEventListener('click', getSearch);


function getSearch() {
  search = document.querySelector('#input').value;
  console.log(search)

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=a876e7500012d962d40cf6ba7bd19019&language=en-US&query=${search}&page=1&include_adult=false`)
  .then((response) => {
    return response.json();
  }).catch((err) => alert(err, "I have no idea what's going on!!!"))
  .then((movies) => {
    console.log(movies.results);
 movieCard =  movies.results.map(movie => {
    return movie;
  });
  })







} // end of function
