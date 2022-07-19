const search = document.querySelector(".home"); 
const form = document.querySelector(".home__form");
const main = document.querySelector("main")

// getting date and day
const today = new Date();
const date = String(today.getDate()).padStart(2, '0');
const month = today.toLocaleString('default', { month: 'long' })

// adding event listener on form
form.addEventListener("submit", function (e) { handleSubmit (e) });

// function for form submit
function handleSubmit (e) {
  e.preventDefault();
  const searchVal =  form.elements[0].value;
  validation(searchVal);
  form.reset();
}

// function for  form validation
function validation (x) {
  const alphaRegEx = /^[A-Za-z]+$/;
  if(x !== '' && x.match(alphaRegEx) ) { getResult(x); }
  else { alert ("Please enter proper name"); }
}

// fetching result using API
async function getResult (city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?APPID=2369b29f592b846dcf8f05a1f3416d55&q=${city}&units=metric`;
  const result = await fetch(url).then(res => res.json()).catch(err => alert(err));
  if (result.cod === 200) {
    search.classList.add("hide");
    showResult(result);
  } else {
    search.classList.add("hide");
    notFound(result);
  }
 
}

// function for getting image according to weather
function getImage(img) {
  if (img === 'Clouds') return './assets/Images/conditions/cloudy.png'
  if (img === 'Rain') return './assets/Images/conditions/rainy.png'
  if (img === 'Sunny') return './assets/Images/conditions/sunny.png'
  if (img === 'Clear') return './assets/Images/conditions/clear.png'
  if (img === 'Mist') return './assets/Images/conditions/mist.png'
  if (img === "Smoke") return './assets/Images/conditions/smoke.png'
  if (img === "drizzle") return './assets/Images/conditions/drizzle.png'
  return './assets/Images/conditions/clear.png'
}

// function for displaying result
function showResult(data) {
  const result = document.createElement("div");
  result.classList.add("result");
  result.innerHTML = `<div class="wrapper">
  <span class="result__close">close</span>
  <p class="result__day">Today, <span class="result__day__date">${date} ${month}</span></p>
  <h2 class="result__city">${data.name}</h2>
  <div class="result__img">
    <figure ><img src="${getImage(data.weather[0].main)}" alt="${data.weather[0].main}" class="result__img__figure"></figure>
    <h3 class="result__img__title">${data.weather[0].main}</h3>
    <p class="result__img__info">${data.weather[0].description}</p>
  </div>
  <ul class="result__condition">
    <li class="result__condition__item result__condition__item--temp">
      <p class="result__condition__item__title">temp</p>
      <span class="result__condition__item__result">${data.main.temp}</span>
    </li>
    <li class="result__condition__item result__condition__item--feels-like">
      <p class="result__condition__item__title">feels like</p>
      <span class="result__condition__item__result">${data.main.feels_like}</span>
    </li>
    <li class="result__condition__item result__condition__item--humidity">
      <p class="result__condition__item__title">humidity</p>
      <span class="result__condition__item__result">${data.main.humidity}</span>
    </li>
    <li class="result__condition__item result__condition__item--wind">
      <p class="result__condition__item__title">wind</p>
      <span class="result__condition__item__result">${data.wind.speed} ${data.wind.deg}</span>
    </li>
    <li class="result__condition__item result__condition__item--pressure">
      <p class="result__condition__item__title">pressure</p>
      <span class="result__condition__item__result">${data.main.pressure}</span>
    </li>
  </ul>
</div>`

  main.appendChild(result);
  const close = document.querySelector(".result__close");
  close.addEventListener("click", () => {
    result.remove();
    search.classList.remove("hide");
  })
}

// function for no result found
function notFound () {
  const noResult = document.createElement("div");
  noResult.classList.add("no-result");

  noResult.innerHTML = `
  <div class="wrapper">
    <span class="no-result__close">close</span>
    <h3 class="no-result__text">Sorry!! No result found....</h3>
  </div>
  `
  main.appendChild(noResult);
  const close = document.querySelector(".no-result__close");
  close.addEventListener("click", () => {
    noResult.remove();
    search.classList.remove("hide");
  })
}
