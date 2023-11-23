"use strict";

// Hi Eskil! Please kindly select '🐛BUGFIX' labels

let formEl = document.querySelector("#search"); // 🐛BUGFIX :: The second quotation was single [Found as a Console error] / 🐛BUGFIX :: ID Selector must have # notation [Found as a Console error]
let cityInputEl = document.querySelector("#city"); // 🐛BUGFIX :: The Selector was misspelled [Found as a Console error] / 🐛BUGFIX :: ID Selector must have # notation [Found as a Console error]
let tempEl = document.querySelector("#temp"); // 🐛BUGFIX :: ID Selector must have # notation [Found as a Console error]
let messageEl = document.querySelector("#message"); // 🐛BUGFIX :: ID Selector must have # notation [Found as a Console error]
let errorMessageEl = document.querySelector("#error-message");

async function getData() {

  // 🐛BUGFIX :: As the legends say it's always nice to validate user's input value before processing it [Found by trying to put empty or number input]
  const pattern = /^[a-zA-Z]+$/; // Regex by GPT (One of the best things it does)

  if (!cityInputEl.value || !pattern.test(cityInputEl.value)) {
      errorMessageEl.textContent = "Invalid input. Please enter a city name with only letters.";
      errorMessageEl.classList.add("show");
      return;
  } else {
      errorMessageEl.classList.remove("show");
  }

  // Fetch data from Open Weather Map API, passing the input value as city
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.value}&appid=8f20807cea52eed92572aea82df038d5`
  );
  let data = await res.json();

  // 🐛BUGFIX :: As the legends say it's always nice to validate user's input value before processing it [Found by trying to put a wrong city name]
  if(data.cod != 200)
  {
    errorMessageEl.textContent = `Invalid input. ${cityInputEl.value} seems not to be a real city. Be smart!`;
    errorMessageEl.classList.add("show");
    return;
  } else {
    errorMessageEl.classList.remove("show");
  }

  // We get temperatures back in Kelvin so we need to convert nto Celsius
  // https://www.rapidtables.com/convert/temperature/kelvin-to-celsius.html
  let temp = Math.round(data.main.temp - 273.15); // 🐛BUGFIX :: temp location was wrong [Found as a Console error] / 🐛BUGFIX :: The number must get rounded [Found as a visual error in UI]

  tempEl.textContent = `${temp}°C`; // 🐛BUGFIX :: Template string must be inside backticks rather double quotation [Found as a visual error in UI]

  // Different temperature ranges should print different messages:
  //
  // Below 0 = Winter is coming
  // 0-10 = Sweater weather
  // 11-20 = Put a jacket on and regret it as soon as you start moving
  // Above 21 = Hotter outside than Taylor Swift's latest single

  if (temp < 0) { // 🐛BUGFIX :: Wrong operator used [Found as a Logical error]
    messageEl.textContent = "Winter is coming...";
  } else if (temp >= 0 && temp <= 10) { // 13. Range coverage was wrong [Found as a Logical error]
    messageEl.textContent = "Sweater weather!"
  } else if (temp >= 11 && temp <= 20) { // 14. Range coverage was wrong [Found as a Logical error]
    messageEl.textContent = "Put a jacket on and regret it as soon as you start moving";
  } else if (temp > 21) { // 15. Range coverage was wrong *** I made it aligned with the instructions (temp > 21) but still 20 - 21 is not covered [Suggestion: (temp > 20)]*** [Found as a Logical error]
    messageEl.textContent = "Hotter outside than Taylor Swift's latest single";
  }
}

formEl.addEventListener("submit", function (e) { // 🐛BUGFIX :: event parameter must have bin inside braces [Found as a Console error]
  e.preventDefault(); // 🐛BUGFIX :: e was missing before the function preventDefault [Found as a Console error]
  getData();
});
