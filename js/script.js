const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=08b9878768c1e534636bc3665029f9f3&language=en-US&page=1';

const image_url = 'https://image.tmdb.org/t/p/w500';

const list = document.querySelector('.movie-list');

getMovies(url);

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data.results);
            showMovies(data.results);
        })
}

function showMovies(data) {
    data.forEach(movie => {
        const {id, title, poster_path, release_date} = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.id = id;
        movieEl.dataset.bsToggle = "modal";
        movieEl.dataset.bsTarget = "#staticBackdrop";

        movieEl.innerHTML = `
            <img src="${image_url + poster_path}" alt="${title}">

            <div class="movie-info">
                <h2>${title}</h2>
                <h5>Release Date: ${release_date}</h5>
            </div>
        `

        list.appendChild(movieEl);
    });
}



const adder = document.querySelector('.bi-plus-square-fill')
const substractor = document.querySelector('.bi-dash-square-fill')

adder.addEventListener('click', addPrice);
substractor.addEventListener('click', minusPrice);

function addPrice() {
    const noOfTickets = document.querySelector('.ticket-no');
    let num = parseInt(noOfTickets.textContent)

    num += 1
    noOfTickets.textContent = num

    const total = document.querySelector('.total');
    const price = 200;
    let sum = price * num;
    sum = sum + sum * 18/100
    total.textContent = sum;
}

function minusPrice() {
    const noOfTickets = document.querySelector('.ticket-no');
    let num = parseInt(noOfTickets.textContent)

    if(num > 1) {
        num -= 1
    } else {
        alert("No. of tickets can't be 0")
    }

    noOfTickets.textContent = num

    const total = document.querySelector('.total');
    const price = 200;
    let sum = price * num;
    sum = sum + sum * 18/100
    total.textContent = sum;
}

const close = document.querySelector('.btn-close');

close.addEventListener('click', cleanData)

const btn = document.querySelector('.btn-book')


function cleanData() {
    const noOfTickets = document.querySelector('.ticket-no');
    noOfTickets.textContent = 1
    btn.disabled = false
    btn.textContent = 'Book Now'
}

btn.addEventListener('click', disableBtn)

function disableBtn() {
    let val = confirm('Are you sure ?');
    if(val == true) {
        btn.textContent = 'Booked!'
        btn.disabled = true
    }

}