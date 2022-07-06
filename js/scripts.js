//Plugged in a API link into a variable
const apiLink = "https://randomuser.me/api/?results=12&nat=us";
// Captured the element with the id of gallery and plugged it into a variable
const gallery = document.getElementById("gallery");
// Created a new div element
const newDiv = document.createElement("div");
// Added the className "modal-container" to the new element
newDiv.classList.add("modal-container");
// Set the display of the new element to none
newDiv.style.display = "none";
// Captured the element with the className "modal"
const modal = document.getElementsByClassName("modal");
// Created a variable named employees and set it to an empty array
let employees = [];

//Used fetch and passed in the API link to return a promise
fetch(apiLink)
  .then(checkStatus) //Passed in the funtion checkStatus to the .then()
  .then((response) => response.json()) // Passed in a response to a .then() and parsed it to JSON
  .then((data) => {
    //Passed another .then() with data as the parameter where the variable employees was set to the data results
    employees = data.results;
    generateUser(employees); //Passed in the generateUser() and passed it the employees parameter
    generateModal(employees); //Passed in the generateModal() and passed it the employees parameter
  })
  .catch((error) => console.log("Sorry there has been an error", error)); //Used the catch() and passed in an error that would console.log a error message

// Created a function named checkStatus that passes the perameter response
function checkStatus(response) {
  if (response.ok) {
    //If the response is ok then it returns promise resolve
    return Promise.resolve(response);
  } else {
    // Else promise reject
    return Promise.reject(new Error(response.status));
  }
}

// Created a function that would display 12 random users and passed in the parameter employee
function generateUser(employee) {
  gallery.innerHTML = ""; //Set the innerHTMl of the variable gallery to empty
  for (let i = 0; i < employee.length; i++) {
    //Looped through the employee array and displayed the employee information at the given index
    let html = ` 
      <div class="card" data-index="${[i]}">
          <div class="card-img-container">
              <img class="card-img" src="${
                employee[i].picture.medium
              }" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="employee-name" class="card-name cap">${
                employee[i].name.first
              } ${employee[i].name.last}</h3>
              <p class="card-text">${employee[i].email}</p>
              <p class="card-text cap">${employee[i].location.city}, ${
      employee[i].location.state
    }</p>
          </div>
      </div>
      `;
    gallery.insertAdjacentHTML("beforeend", html); //Used the variable gallery and insertAdjacentHTMl to add the html created and position it beforeend
  }
}



// Created a function that would display a modal when a given employee card was clicked and passed in the parameter employee
function generateModal(employee) {
  modal.innerHTML = ""; //Set the innerHTMl of the variable modal to empty
  for (let i = 0; i < employee.length; i++) {// Looped through the employee array and displayed the employee information at the given index
    let date = new Date(employee[i].dob.date);//Set a variable that held the dob of the employee at the given index
    function formatDate(date) {//Created a function that took in the date variable to format the date XX/XX/XX
      var month = date.getMonth();
      var day = date.getDate().toString().padStart(2, "0");
      var year = date.getFullYear();
      year = year.toString().substr(-2)
      month = (month + 1).toString().padStart(2, "0");
      return month + "/" + day + "/" + year;
    }
    let html = `
          <div class="modal"  id="${[i]}">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${
                    employee[i].picture.large
                  }" alt="profile picture">
                  <h3 id="modal-name" class="modal-name cap">${
                    employee[i].name.first
                  } ${employee[i].name.last}</h3>
                  <p class="modal-text">${employee[i].email}</p>
                  <p class="modal-text cap">${employee[i].location.city}</p>
                  <hr>
                  <p class="modal-text">${employee[i].phone}</p>
                  <p class="modal-text">${employee[i].location.street.number} ${
      employee[i].location.street.name
    }, ${employee[i].location.city}, ${employee[i].location.state}, ${
      employee[i].location.postcode
    } </p>
                  <p class="modal-text">Birthday: ${formatDate(date)}</p>
          </div>`;
    document.body.appendChild(newDiv); //Appended the newDiv element to the body
    newDiv.insertAdjacentHTML("beforeend", html); //Used the variable newDiv and insertAdjacentHTMl to add the html created and position it beforeend
    modal[i].style.display = "none"; //Set the modal that was currently chosen style to display none
  }
}


//Created an eventListener with the variable gallery to listen for a click event
gallery.addEventListener("click", (e) => {
  // Created an if statement that only targets clicked that had the className gallery would produce a modal window
  if (e.target.className !== "gallery") {
    const card = e.target.closest(".card"); // Created a variable named card that would hold the e.target closest element with the class Name card
    const cardIndex = card.getAttribute("data-index"); //Created a variable that took in the variable card and its attribute "data=index"
    modal[cardIndex].style.display = ""; //Used the modal variable and plugged in the cardIndex as an index value
    newDiv.style.display = "block"; //Displayed the newDiv style to display block
  }
});

//Created an eventListener with the variable newDiv and listened for a click event
newDiv.addEventListener("click", (e) => {
  if (e.target.closest(".modal-close-btn")) {
    //Used an if statement to check for the e.targets closest modal-close-btn class
    for (let i = 0; i < modal.length; i++) {
      //Created a for loop to loop through the modal chosen
      newDiv.style.display = "none"; //Used newDiv element style to display none
      modal[i].style.display = "none"; //Got the index value of the current modal and set it to display none
    }
  }
});
