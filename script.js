// // Movies List
// const moviesList = [
//   { movieName: "Flash", price: 7 },
//   { movieName: "Spiderman", price: 5 },
//   { movieName: "Batman", price: 4 },
// ];

// // Elements
// const selectMovie = document.getElementById("selectMovie");
// const movieName = document.getElementById("movieName");
// const moviePrice = document.getElementById("moviePrice");
// const totalPrice = document.getElementById("totalPrice");
// const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
// const numberOfSeatEl = document.getElementById("numberOfSeat");
// const proceedBtn = document.getElementById("proceedBtn");
// const cancelBtn = document.getElementById("cancelBtn");
 
// // Initialize movie dropdown and price
// moviesList.forEach((movie, index) => {
//   const option = document.createElement("option");
//   option.textContent = `${movie.movieName} $${movie.price}`;
//   option.value = movie.price;
//   selectMovie.appendChild(option);
// });

// // Set default movie
// const defaultIndex = moviesList.findIndex(movie => movie.movieName === "Flash");
// selectMovie.selectedIndex = defaultIndex;
// moviePrice.textContent = `$${moviesList[defaultIndex].price}`;
// movieName.textContent = selectMovie[defaultIndex].textContent.split("$")[0];

// // Set ticket price for the default movie
// let ticketPrice = parseFloat(moviesList[defaultIndex].price); 

// // Handle movie selection change
// selectMovie.addEventListener("change", function () {
//   const selectedOption = selectMovie.options[selectMovie.selectedIndex];
//   movieName.textContent = selectedOption.textContent.split("$")[0];
//   moviePrice.textContent = `$${selectedOption.value}`;
//   totalPrice.textContent = `$0`; // Reset total price after movie change
//   ticketPrice = parseFloat(selectedOption.value); // Update ticket price based on selection
//   selectedSeats = []; // Reset selected seats when the movie is changed
//   const seat = document.getElementsByClassName(".seat");
//   seats.forEach(seat=>{
//     seat.classList.remove("selected");
//   });
//   updateSelectedSeats(); 
//   numberOfSeatEl.textContent = "0"; 
// });


// const seats = document.querySelectorAll("#seatCont .seat");
// let selectedSeats = [];

// function updateSelectedSeats() {
//   if (selectedSeats.length > 0) {
//     selectedSeatsHolder.innerHTML = selectedSeats
//       .map(seatIndex => `Seat ${seatIndex + 1}`)
//       .join(", ");
//   } else {
//     selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
//   }
// }


// seats.forEach((seat, index) => {
//   if (!seat.classList.contains("occupied")) {
//     seat.addEventListener("click", function () {
//       if (seat.classList.contains("selected")) {
    
//         seat.classList.remove("selected");
//         selectedSeats = selectedSeats.filter(s => s !== index);
//       } else {
        
//         seat.classList.add("selected");
//         selectedSeats.push(index);
//       }

      
//       updateSelectedSeats();

     
//       numberOfSeatEl.textContent = selectedSeats.length;

      
//       const total = selectedSeats.length * ticketPrice;      
//       totalPrice.textContent = selectedSeats.length > 0 ? `$${total.toFixed(2)}` : '$0';  
//     });
//   }
// });


// proceedBtn.addEventListener("click", function () {
//   if (selectedSeats.length === 0) {
//     alert("Oops, no seat selected");
//   } else {
//     alert("Yay! Your seats have been booked.");
    
//     selectedSeats.forEach(seatIndex => {
//       const seatElement = seats[seatIndex];
//       seatElement.classList.remove("selected");
//       seatElement.classList.add("occupied");
//     });

    
//     selectedSeats = [];
//     updateSelectedSeats();
//     numberOfSeatEl.textContent = "0";
//     totalPrice.textContent = "$0"; 
//   }
// });


// cancelBtn.addEventListener("click", function () {
//   // Deselect all selected seats
//   selectedSeats.forEach(seatIndex => {
//     const seatElement = seats[seatIndex];
//     seatElement.classList.remove("selected");
//   });

  
//   selectedSeats = [];
//   updateSelectedSeats();
//   numberOfSeatEl.textContent = "0"; 
//   totalPrice.textContent = "$0"; 
// });


const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
  const selectMovieEl = document.getElementById("selectMovie");
  
  const allSeatCont = document.querySelectorAll("#seatCont .seat");
  console.log(allSeatCont)
  
  const selectedSeatsHolderEl = document.getElementById("selectedSeatsHolder");
  
  const moviePriceEl = document.getElementById("moviePrice");
  
  const cancelBtnEL = document.getElementById("cancelBtn");
  
  const proceedBtnEl = document.getElementById("proceedBtn");
  
  moviesList.forEach((movie) => {
    const optionEl = document.createElement("option");
    optionEl.innerHTML = `${movie.movieName} $${movie.price}`;
    selectMovieEl.appendChild(optionEl);
  });
  
  let moviePrice = 7;
  let currentMovieName = `Tom and Jerry 2021`;
  
  selectMovieEl.addEventListener("input", (e) => {
    let movieName = e.target.value.split("");
    let dollarIndex = movieName.indexOf("$");
    let movie = movieName.splice(0, dollarIndex - 1).join("");
    currentMovieName = movie;
    moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(""));
  
    updatMovieName(movie, moviePrice);
    updatePrice(moviePrice, takenSeats.length);
  });
  //
  let initialSeatValue = 0;
  allSeatCont.forEach((seat) => {
    const attr = document.createAttribute("data-seatid");
    attr.value = ++initialSeatValue;
    seat.setAttributeNode(attr);
  });
  
  let seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");
  // console.log(seatContEl);
  let takenSeats = [];
  
  seatContEl.forEach((seat) => {
    seat.addEventListener("click", (e) => {
      let isSelected = seat.classList.contains("selected");
  
      let seatId = JSON.parse(seat.dataset.seatid);
  
      if (!isSelected) {
        seat.classList.add("selected");
        takenSeats.push(seatId);
        takenSeats = [...new Set(takenSeats)];
      } else if (isSelected) {
        seat.classList.remove("selected");
  
        takenSeats = takenSeats.filter((seat) => {
          // console.log(seat,seatId)
          if (seat !== seatId) {
            return seat;
          }
        });
      }
      updateSeats();
      updatePrice(moviePrice, takenSeats.length);
    },{ once: true });
  });
  
  function updateSeats() {
    selectedSeatsHolderEl.innerHTML = ``;
  
    takenSeats.forEach((seat) => {
      const seatHolder = document.createElement("div");
      seatHolder.classList.add("selectedSeat");
      selectedSeatsHolderEl.appendChild(seatHolder);
  
      seatHolder.innerHTML = seat;
    });
  
    if (!takenSeats.length) {
      const spanEl = document.createElement("span");
      spanEl.classList.add("noSelected");
      spanEl.innerHTML = `NO SEAT SELECTED`;
      selectedSeatsHolderEl.appendChild(spanEl);
    }
  
    seatCount();
  }
  
  function seatCount() {
    const numberOfSeatEl = document.getElementById("numberOfSeat");
    numberOfSeatEl.innerHTML = takenSeats.length;
  }
  
  function updatMovieName(movieName, price) {
    const movieNameEl = document.getElementById("movieName");
    const moviePriceEl = document.getElementById("moviePrice");
    movieNameEl.innerHTML = movieName;
    moviePriceEl.innerHTML = `$ ${price}`;
    
  }
  
  function updatePrice(price, seats) {
    const totalPriceEl = document.getElementById("totalPrice");
    let total = seats * price;
    totalPriceEl.innerHTML = `$ ${total}`;
  }
  
  cancelBtn.addEventListener("click", (e) => {
    cancelSeats();
  });
  
  function cancelSeats() {
    takenSeats = [];
    seatContEl.forEach((seat) => {
      seat.classList.remove("selected");
    });
    updatePrice(0, 0);
    updateSeats();
  }
  
  proceedBtnEl.addEventListener("click", (e) => {
    if (takenSeats.length) {
      alert("Yayy! Your Seats has been booked");
      uncancelSeats();
    } else {
      alert("Oops no seat Selected");
    }
  });
  
  function uncancelSeats() {
    takenSeats = [];
    console.log(seatContEl);
    seatContEl.forEach((seat) => {
      if(seat.classList.contains("selected")){
        console.log(seat);
      seat.classList.remove("selected");
        seat.classList.add("seat")
      seat.classList.add("occupied");
      }
    });
    updatePrice(0, 0);
    updateSeats();
  }
  