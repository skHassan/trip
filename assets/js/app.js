const DATA_URL = 'data/trips.json';

const formatDate = (value, opts={}) => new Intl.DateTimeFormat('en-IN', {day:'2-digit',month:'short',year:'numeric', ...opts}).format(new Date(value + 'T00:00:00'));

async function init(){
  const target = document.getElementById('tripList');
  try{
    const res = await fetch(DATA_URL);
    if(!res.ok) throw new Error('Unable to load trip data');
    const {trips=[]} = await res.json();
    target.innerHTML = trips.map(trip => `
      <a class="trip-card" href="trip.html?id=${encodeURIComponent(trip.id)}">
        <div class="trip-card__top">
          <div>
            <p class="eyebrow">${trip.startDate.slice(0,4)} Journey</p>
            <h2>${trip.title}</h2>
            <p class="muted">${trip.subtitle || ''}</p>
          </div>
          <span class="status">${trip.status || 'trip'}</span>
        </div>
        <div class="trip-meta">
          <span>${formatDate(trip.startDate)}</span>
          <span>→</span>
          <span>${formatDate(trip.endDate)}</span>
          <span>${trip.days?.length || 0} days</span>
        </div>
      </a>
    `).join('') || '<p class="muted">No trips available.</p>';
  }catch(err){
    target.innerHTML = `<p class="muted">${err.message}. Make sure the site is being served through HTTP/HTTPS.</p>`;
  }
}
init();
