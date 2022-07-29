// error handling saat pencarian film

window.onload = () => {
    const films = document.querySelector('.films')
    search.onclick = async () => {
        
        // untuk handling error kita bisa menggunakan try dan catch
        try{
            const film = await getMovie(cariFilm.value);
            const inner = film.Search.map(e => createCard(e)).join('');
            films.innerHTML = inner;
        }catch(err){
            alert("Error : "+err);
        }   
        
    }
    window.onclick = async (e)=>{  
        if(e.target.classList.contains('detail')){
            const card = e.target.parentElement.parentElement;
            try{
                const detail = createDetail(await getMovieDetail(card.getAttribute('idFilm')));
                updateUIDetail(detail);
            }catch(err){
                alert("Error : "+err)
            }
        }
    }
    cariFilm.onkeypress = async(e) => {
        if(e.key === 'Enter'){
            try{
                const film = await getMovie(cariFilm.value);
                const inner = film.Search.map(e => createCard(e)).join('');
                films.innerHTML = inner;
            }catch(err){
                alert("Error : "+err);
            }  
        }
    }
}




const updateUIDetail = (detail) => {
    const detailContainer = document.querySelector('.detail-container');
    detailContainer.innerHTML = detail;
    detailContainer.style.opacity = '1';
    detailContainer.style.zIndex = '2';
    document.querySelector('.close').onclick = ()=>{
        detailContainer.style.opacity= '0';
        detailContainer.style.zIndex = -99;
    }
}
const getMovieDetail =  async (movId) => {

        const response = await fetch('http://www.omdbapi.com/?apikey=63118199&i=' + movId);
        const response2 = await response.json();
        if(response2.Response ==="False") throw new Error(response2.Error);
        return response2;
    
}

const getMovie = async (keyword) => {
    return await fetch('http://www.omdbapi.com/?apikey=63118199&s='+  keyword)
    .then(response => {
        if(!response.ok) {throw new Error('unauthorized');}
        return response.json();
    })
    .then(response => {
        if(response.Response === 'False') throw new Error(response.Error);
        return response;
    })
}

function createCard(mov){
   
    return `
        <div class="card" idFilm="${mov.imdbID}">
            <img src="${mov.Poster}" alt="" class="poster">
            <div class="description">
                <h3>${mov.Title}</h3>
                <p>${mov.Year}</p>
                <button class="detail">Movie Detail</button>
            </div>
        </div>
    `
}

function createDetail(film){
    return `
    <div class="detail">
        <div class="detail-header">
        </div>
        <div class="detail-main">
            <div class="poster">
                <img src="${film.Poster}" alt="">
            </div>
            <div class="description">
                <ul>
                    <li><h2 class="title">${film.Title}</h2></li>
                    <li><span>Director : </span>${film.Director}</li>
                    <li><span>Actors : </span>${film.Actors}</li>
                    <li><span>Writer : </span>${film.Writer}</li>
                    <li><span>Plot : </span>${film.Plot}</li>
                </ul>
            </div>
        </div>
        <div class="detail-footer">
            <button class="close btn-secondary">close</button>
        </div>
    </div>
    `

}