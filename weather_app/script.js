// --- Weather Info Card Single Source of Truth ---
const weatherData = [
  {location: 'San Francisco, CA', temp: 18, condition: 'Cloudy', code: 'cloudy', icon: '☁️', humidity: 81, wind: 13},
  {location: 'Phoenix, AZ', temp: 33, condition: 'Sunny', code: 'sunny', icon: '☀️', humidity: 19, wind: 10},
  {location: 'Seattle, WA', temp: 12, condition: 'Rainy', code: 'rainy', icon: '🌧️', humidity: 94, wind: 21},
  {location: 'Denver, CO', temp: -2, condition: 'Snowy', code: 'snowy', icon: '❄️', humidity: 59, wind: 12},
  {location: 'Miami, FL', temp: 29, condition: 'Sunny', code: 'sunny', icon: '🌤️', humidity: 70, wind: 18},
  {location: 'London, UK', temp: 9, condition: 'Stormy', code: 'stormy', icon: '⛈️', humidity: 87, wind: 27},
];

// DOM refs
const locationEl = document.getElementById('location');
const tempEl = document.getElementById('temp');
const conditionEl = document.getElementById('condition');
const iconEl = document.getElementById('icon');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const refreshBtn = document.getElementById('refresh');
const themeBtn = document.getElementById('theme-toggle');
const cardEl = document.getElementById('card');
const bodyEl = document.body;

let currentIndex = -1;

function applyConditionClass(code){
  cardEl.classList.remove('sunny','cloudy','rainy','snowy','stormy');
  cardEl.classList.add(code);
}
function renderIndex(i){
  const data = weatherData[i];
  locationEl.textContent = data.location;
  tempEl.textContent = `${data.temp}°C`;
  conditionEl.textContent = data.condition;
  iconEl.textContent = data.icon;
  humidityEl.textContent = `Humidity: ${data.humidity}%`;
  windEl.textContent = `Wind: ${data.wind} km/h`;
  applyConditionClass(data.code);
  currentIndex = i;
}
function pickRandomIndex(){
  if(weatherData.length === 0) return 0;
  if(weatherData.length === 1) return 0;
  let i;
  do { i = Math.floor(Math.random()*weatherData.length); } while (i === currentIndex);
  return i;
}
refreshBtn.addEventListener('click', ()=>{
  const next = pickRandomIndex();
  renderIndex(next);
});
function setTheme(isDark) {
  bodyEl.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('weatherCardTheme', isDark ? 'dark' : 'light');
}
themeBtn.addEventListener('click', () => {
  const isDark = bodyEl.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});
window.addEventListener('DOMContentLoaded', ()=>{
  renderIndex(Math.floor(Math.random()*weatherData.length));
  const savedTheme = localStorage.getItem('weatherCardTheme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme === 'dark');
});
// --- Floating Digital Clock (IST, Always Real-Time) ---
document.addEventListener('DOMContentLoaded', function () {
  function updateClock() {
    const clockEl = document.getElementById('site-clock');
    if (!clockEl) return;
    const now = new Date();
    const istString = now.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockEl.textContent = `${istString} IST`;
  }
  setInterval(updateClock, 1000);
  updateClock();
});
