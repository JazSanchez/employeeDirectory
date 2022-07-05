const searchContainer = document.getElementsByClassName("search-container");
const gallery = document.getElementById("gallery");
const divElement = document.createElement('div');
// console.log(divElement);
const body = document.querySelector('body');
// console.log(body)
const newDiv = body.appendChild(divElement);
console.log(newDiv)

const apiURL = 'https://randomuser.me/api/?results=12';

function fetchData(apiURL){
  return fetch(apiURL)
               .then(res=> res.json())
}


fetchData(apiURL)
.then(data => generateUser(data.results))



function generateUser(data) {
  gallery.innerHTML = '';
  for(let i =0; i < data.length; i++){
  let html = ` <div class="card">
  <div class="card-img-container">
      <img class="card-img" src=${data[i].picture.medium} alt="profile picture">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
      <p class="card-text">${data[i].email}</p>
      <p class="card-text cap">${data[i].location.city}</p>
  </div>
</div>`;

gallery.insertAdjacentHTML('beforeend', html)

}
}

newDiv.classList.add('modal-container');
newDiv.style.display ="none";
const button = document.createElement('button');
button.classList.add('modal-close-btn');
button.setAttribute('id',"modal-close-btn" );
console.log(button)


const rndmUsers = [];




 function generateModal(data){
  newDiv.innerHTML = '';

  for(let i=0; i< data.length; i++){
  let div = `  
   <div class="modal">
   <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
  <div class="modal-info-container">
      <img class="modal-img" src=${data[i].picture.large} alt="profile picture">
      <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
      <p class="modal-text">${data[i].email}</p>
      <p class="modal-text cap">${data[i].location.city}</p>
      <hr>
      <p class="modal-text">(555) 555-5555</p>
      <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
      <p class="modal-text">Birthday: 10/21/2015</p>
  </div>`


newDiv.insertAdjacentElement('beforeend', div)

  }
}


newDiv.addEventListener('click', () => {
  generateModal()
 newDiv.classList.add('.show')
  

})

