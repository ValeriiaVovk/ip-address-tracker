const ip = document.getElementById('ip');
const loc = document.getElementById('loc');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const API_KEY = 'ENTER_YOUR_KEY';
const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`

async function fetchAPIData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const displayMap = L.map('map', {
    'layers': [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    ]
})

function marker (updateMarker = [0, 0]) {
    displayMap.setView(updateMarker, 13);
    L.marker(updateMarker).addTo(displayMap);
}

function updateInfo(data) {
    ip.innerHTML = `${data.ip}`;
    loc.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    timezone.innerHTML = `${data.location.timezone}`;
    isp.innerHTML = `${data.isp}`;

    marker([data.location.lat, data.location.lng])
}

async function showCurrentInfo() {
    const data = await fetchAPIData(API_URL);
    updateInfo(data);
}

async function showSearchInfo(search_ip) {
    const API_URL_SEARCH = `${API_URL}&ipAddress=${search_ip}`;
    const data = await fetchAPIData(API_URL_SEARCH);
    updateInfo(data);
}

async function init() {
    showCurrentInfo();

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(searchInput.value !== '') {
            showSearchInfo(searchInput.value);
            return;
        } else {
            alert('Please, enter a valid IP address')
        }
    })
}

document.addEventListener('DOMContentLoaded', init);