let reservations = [];

function reserveLesson() {
    // pakt de gevulde informatie
    const nameInput = document.getElementById("name");
    const customerNumberInput = document.getElementById("customerNumber");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const lessonSelect = document.getElementById("lesson");
    const dayInput = document.getElementById("day");
    const timeInput = document.getElementById("time");

    // slaat de gevulde informatie op
    const name = nameInput.value;
    const customerNumber = customerNumberInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const lesson = lessonSelect.options[lessonSelect.selectedIndex].text;
    const day = dayInput.value;
    const time = timeInput.value;

    // checkt als alles is ingvult
    if (!name || !customerNumber || !phone || !email || !lesson || !day || !time) {
        alert("Vul alle verplichte velden in.");
        return;
    }

    // checkt of er al drie keer is geresveerd
    if (reservations.length >= 3) {
        alert("Je kunt maximaal 3 lessen reserveren.");
        return;
    }

    //checkt of het niet over geboekt word
    const existingTime = reservations.find((res) => res.time === time);
    if (existingTime) {
        alert("Deze tijd is al gereserveerd.");
        return;
    }

    const discounted = isDiscountedTime(time);
    const cost = calculateCost(discounted);

    const reservation = {
        name,
        customerNumber,
        phone,
        email,
        lesson,
        day,
        time,
        cost,
    };

    reservations.push(reservation);
    updateReservationDetails();
}

function updateReservationDetails() {
    const detailsContainer = document.getElementById("reservation-details");
    const totalCostContainer = document.getElementById("total-cost");

    detailsContainer.innerHTML = "";
    totalCostContainer.innerHTML = "";

    reservations.forEach((reservation) => {
        const details = document.createElement("p");
        details.textContent = `Les: ${reservation.lesson}, Datum: ${reservation.day}, Tijdstip: ${reservation.time}, Kosten: €${reservation.cost.toFixed(2)}`;
        detailsContainer.appendChild(details);
    });

    const totalCost = reservations.reduce((acc, curr) => acc + curr.cost, 0);
    const totalCostElement = document.createElement("p");
    totalCostElement.textContent = `Totale Kosten: €${totalCost.toFixed(2)}`;
    totalCostContainer.appendChild(totalCostElement);

    if (reservations.length > 0) {
        const latestReservation = reservations[reservations.length - 1];
        const personalInfo = document.createElement("p");
        personalInfo.textContent = `Naam: ${latestReservation.name}, Klantnummer: ${latestReservation.customerNumber}, Telefoonnummer: ${latestReservation.phone}, E-mail: ${latestReservation.email}`;
        detailsContainer.appendChild(personalInfo);
    }
}

// checket of er korting is
function isDiscountedTime(time) {
    const parsedTime = parseInt(time.split(":")[0], 10);
    return parsedTime >= 11 && parsedTime < 16;
}

//berekent de goedkopere prijzen
function calculateCost(discounted) {
    const baseCost = 10;
    return discounted ? baseCost * 0.7 : baseCost;
}