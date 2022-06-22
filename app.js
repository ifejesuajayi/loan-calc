document.querySelector("#loan-form").addEventListener("submit", function (e) {
  // hide results
  document.getElementById("results").style.display = "none";
  // show loaading gif
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

function calculateResults() {
  console.log("calculating...");

  // UI Variables

  // Inputs
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  // Results
  const monthlyPay = document.querySelector("#monthly-payment");
  const totalPay = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // Monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPay.value = monthly.toFixed(2);
    totalPay.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
    //  show reults
    document.getElementById("results").style.display = "block";
    // hide loading
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Type In A Valid Input");
  }
}

// Error message
function showError(error) {
  // hide reults
  document.getElementById("results").style.display = "none";
  // hide loading
  document.getElementById("loading").style.display = "none";
  
  // create a new div
  const newDiv = document.createElement("div");

  // add class
  newDiv.className = "alert alert-danger";

  // append and create text node
  newDiv.appendChild(document.createTextNode(error));

  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector("h3");

  // insert error above heading
  card.insertBefore(newDiv, heading);

  // clear error after 2 seconds
  setTimeout(clearError, 2000);
}

// clear error after 2 seconds
function clearError() {
  document.querySelector(".alert").remove();
}
