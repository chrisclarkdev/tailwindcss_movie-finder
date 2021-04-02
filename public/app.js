btn = document.querySelector('#searchBtn');
input = document.querySelector('#input');
btn.addEventListener('click', getSearch);
// btn.addEventListener('hover', refreshPage)


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function getSearch() {
  const container = document.querySelector('.main')
  removeAllChildNodes(container);


  search = document.querySelector('#input').value;
   
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=a876e7500012d962d40cf6ba7bd19019&language=en-US&query=${search}&page=1&include_adult=false`)
  .then((response) => {
    return response.json();
  }).catch((err) => alert(err, "I have no idea what's going on!!!"))
  .then((movies) => {
    // console.log(movies.results);
 movieCard =  movies.results.map(movie => {
    return movie;
  });
  getmovieCard()
});
}
function getmovieCard() {
  movieCard.forEach( movie => {
    let moviediv = document.createElement('div');
    moviediv.classList.add('movie-container', 'hover-shadow', 'md:bg-white', 'md:w-72' ,'lg:w-full', 'lg:justify-center', 'rounded');
    
    let title = document.createElement('h1');
    let movieTitle = document.createTextNode(movie.title);
    title.classList.add('movie-title_red', 'text-center' , 'text-4xl', 'md:text-lg');
    moviediv.appendChild(title);

    const imgurl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    let img = document.createElement('img');
    
    if (imgurl == "https://image.tmdb.org/t/p/w500/null"){
      img.src = "/public/images/coming-soon.jpg";
    } else {
      img.src = imgurl;
    }
    moviediv.appendChild(img);

    // ADD A FLEX DIV
    let flexEl = document.createElement('div')
    flexEl.classList.add('flex', 'justify-around', 'bg-grey-300','p-4')
    moviediv.appendChild(flexEl)
    // document.querySelector('.flex').appendChild(moviediv);

    let releaseDate = document.createTextNode(movie.release_date);
    let year = releaseDate.data.split('-');
    let yearRelease = document.createElement('p');
    yearRelease.classList.add('year');
    yearRelease.append(`Year: (${year[0]}) `);
    flexEl.appendChild(yearRelease);
    document.querySelector('.main').appendChild(moviediv);

    // rating 
    let rating  = document.createTextNode(movie.vote_average * 10);
    rating_paragragh = document.createElement('p');
    i_class = document.createElement('i');
    rating_paragragh.classList.add('ratings');
    i_class.classList.add("fa",'fa-star','py-1');
   
    rating_paragragh.appendChild(i_class);
    i_class.appendChild(rating);
    flexEl.appendChild(rating_paragragh);
    document.querySelector('.main').appendChild(moviediv);


    // add a href to movie title 

    let linkTag = document.createElement('a');
    linkTag.classList.add('link');
    linkTag.setAttribute('href', ' movie_page.html');
    movieId = movie.id;
    // console.log(movieId)
    title.appendChild(linkTag);
    linkTag.innerHTML = movieTitle.data.length < 22 ? `${movieTitle.data}` : `${movieTitle.data.fontsize(4.5)}`;
    // linkTag.innerHTML = movieTitle.data;
    moviediv.addEventListener('click', ()=> {movieSelected(movie)});
    
    moviediv.onclick = function() {
      modal.style.display = "block";
      getVideo(movie)
    }
    document.querySelector('.main').appendChild(moviediv)
  })
 
}

let frame = document.createElement('IFRAME');
function getVideo(movie) {
  const videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=a876e7500012d962d40cf6ba7bd19019&language=en-US`;
  fetch(videoUrl)
  .then((response) => {
    return response.json();
  }).catch((err) => alert(err))
  .then((video) => {
    const videoId = video.results[0].key;
    
    if (videoId == undefined){
      
      console.log("no video")
      document.body.appendChild(modal).innerHTML = "No Video Available";
    } else {
    console.log(videoId)
    const youtube = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&mute=1";
    const video_container = document.createElement('div');
    video_container.classList.add('youtube', 'mx-auto' ,'px-4', 'flex', 'justify-center' )
    youtubeWidth = window.innerWidth;
    if (innerWidth > 1000 ){
     frame.setAttribute('width', youtubeWidth/2 +'px');
     frame.setAttribute('height', youtubeWidth/3 +'px');
    }else {
     frame.setAttribute('width', `${youtubeWidth - 38}px`);
     frame.setAttribute('height', youtubeWidth/1.77777 +'px');
    }
    
    frame.src = youtube;
    video_container.appendChild(frame);
    content = document.querySelector('.modal-content')
    content.appendChild(video_container)
    document.body.appendChild(modal);
  }
  })
}
 let modal = document.getElementById("myModal");
let videoCon = document.querySelector('.modal-content')
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  frame.remove()
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// function movieSelected(movie) {
 
// }


 