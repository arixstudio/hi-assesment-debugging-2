"use strict";

// Hi Eskil! Please kindly select 'BUGFIX' labels

let formEl = document.querySelector("#search"); // BUGFIX :: The second quotation was single / BUGFIX :: ID Selector must have # notation
let cityInputEl = document.querySelector("#city"); // BUGFIX :: The Selector was misspelled / BUGFIX :: ID Selector must have # notation
let tempEl = document.querySelector("#temp"); // BUGFIX :: ID Selector must have # notation
let messageEl = document.querySelector("#message"); // BUGFIX :: ID Selector must have # notation

async function getData() {

  if(!cityInputEl.value) // BUGFIX :: It's always nice to validate user's input value befor processing it
    return;

  // Fetch data from Open Weather Map API, passing the input value as city
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.value}&appid=8f20807cea52eed92572aea82df038d5`
  );
  let data = await res.json();

  // We get temperatures back in Kelvin so we need to convert nto Celsius
  // https://www.rapidtables.com/convert/temperature/kelvin-to-celsius.html
  let temp = Math.round(data.main.temp - 273.15); // BUGFIX :: temp location was wrong / BUGFIX :: The number must get rounded

  tempEl.textContent = `${temp}°C`; // BUGFIX :: Template string must be inside backticks rather double quotation

  // Different temperature ranges should print different messages:
  //
  // Below 0 = Winter is coming
  // 0-10 = Sweater weather
  // 11-20 = Put a jacket on and regret it as soon as you start moving
  // Above 21 = Hotter outside than Taylor Swift's latest single

  if (temp < 0) { // BUGFIX :: Wrong operator used
    messageEl.textContent = "Winter is coming...";
  } else if (temp >= 0 && temp <= 10) { // 13. Range coverage was wrong
    messageEl.textContent = "Sweater weather!"
  } else if (temp >= 11 && temp <= 20) { // 14. Range coverage was wrong
    messageEl.textContent = "Put a jacket on and regret it as soon as you start moving";
  } else if (temp > 21) { // 15. Range coverage was wrong *** I made it aligned with the instructions (temp > 21) but still 20 - 21 is not covered [Suggestion: (temp > 20)]***
    messageEl.textContent = "Hotter outside than Taylor Swift's latest single";
  }
}

formEl.addEventListener("submit", function (e) { // BUGFIX :: event parameter must have bin inside braces
  e.preventDefault(); // BUGFIX :: e was missing before the function preventDefault
  getData();
});
