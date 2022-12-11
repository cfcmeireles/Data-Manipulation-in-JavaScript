var reservedSeats = {
	record1: {
		seat: "b19",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record2: {
		seat: "b20",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record3: {
		seat: "b21",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record4: {
		seat: "b22",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
};

  let counter = 1;
  
  const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
  
  function leftSeats() {
    rows.forEach(row => {
      document.querySelector("#left").innerHTML += `<div class="label">${row}</div>`
      for (let i = 0; i < 3; i++) {
        document.querySelector("#left").innerHTML += `<div class="a" id="${row + counter}">${counter}</div>`
      counter++;
      }
      counter = counter + 12;
    })
  }
  
  function middleSeats() {
      counter = 4;
    rows.forEach(row => {
      for (let i = 0; i < 9; i++) {
      document.querySelector("#middle").innerHTML += `<div class="a" id="${row + counter}">${counter}</div>`
      counter++;
      }
      counter = counter + 6;
    })
  }
  
  function rightSeats() {
      counter = 13;
  rows.forEach(row => {
      for (let i = 0; i < 3; i++) {
        document.querySelector("#right").innerHTML += `<div class="a" id="${row + counter}">${counter}</div>`
      counter++;
    }
      counter = counter + 12;
      document.querySelector("#right").innerHTML += `<div class="label">${row}</div>`
  })
  }

leftSeats();
middleSeats();
rightSeats();

(function(){
	"use strict";

	for (const key in reservedSeats) {
		if (reservedSeats.hasOwnProperty(key)) {
			const obj = reservedSeats[key];
			console.log(obj.seat);
		
			document.getElementById(obj.seat).innerHTML = "R";
			document.getElementById(obj.seat).className = "r";
		}
	}
}());


(function(){
	"use strict";

	let selectedSeats = [];
	const seats = document.querySelectorAll(".a");

	seats.forEach(seat => {
		seat.addEventListener("click", () => {

				const index = selectedSeats.indexOf(seat.id);

				if (seat.classList.contains("a")) {
					if (index === -1) {
						selectedSeats.push(seat.id);
						selectedSeats.sort();
						console.log(selectedSeats);
						seat.className = "s";
						manageConfirmForm();
					}
				}

				else if (seat.classList.contains("s")) {
							if (index > -1) {
							selectedSeats.splice(index, 1);
							console.log(selectedSeats);
							seat.className = "a";
							manageConfirmForm();
						}
					}
				})
				})

		document.querySelector("#reserve").addEventListener("click", event => {
		 event.preventDefault();
     document.querySelector("#resform").style.display = "block";
		})

		document.querySelector("#cancel").addEventListener("click", event => {
			event.preventDefault();
			document.querySelector("#resform").style.display = "none";
		})

		function manageConfirmForm() {
	
			
			if (selectedSeats.length > 0) {
				document.querySelector("#confirmres").style.display = "block";
				if (selectedSeats.length === 1) {
					document.querySelector("#selectedseats").innerHTML = `You have selected seat ${selectedSeats[0]}`;
				}
				else {
					let seatString = selectedSeats.toString();
					seatString = seatString.replace(/,/g, ", ");
					seatString = seatString.replace(/,(?=[^,]*$)/, " and");
					document.querySelector("#selectedseats").innerHTML = `You have selected seats ${seatString}`;
				}
			}
			else {
				document.querySelector("#confirmres").style.display = "none";
					document.querySelector("#selectedseats").innerHTML = `You need to select some seats to reserve.<br> <a href="#" id="error">Close</a> this dialog box and pick at least one seat.`;
					document.querySelector("#error").addEventListener("click", () => {
					document.querySelector("#resform").style.display = "none";
					})
			}
		}
		manageConfirmForm();

   document.querySelector("#confirmres").addEventListener("submit", event => {
		 event.preventDefault();
     processReservation();
	 })

		function processReservation() {
			
			const records = Object.keys(reservedSeats).length;
			const firstName = document.querySelector("#fname").value;
			const lastName = document.querySelector("#lname").value;
			let counter = 1;
			let nextRecord = "";

			selectedSeats.forEach(thisSeat => {
				document.getElementById(thisSeat).className = "r";
				document.getElementById(thisSeat).innerHTML = "R";

				nextRecord = `record${records + counter}`;
				reservedSeats[nextRecord] = {
					seat: thisSeat,
					owner: {
						fname: firstName,
						lname: lastName
					}
				}
				counter++;
			});
			document.querySelector("#confirmres").style.display = "none";
			selectedSeats = [];
			manageConfirmForm();
			console.log(reservedSeats);
		}
			}());
	