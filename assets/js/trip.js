const DATA_URL = 'data/trips.json';
const qs = new URLSearchParams(location.search);
const tripId = qs.get('id');

const icons = {train:'🚆',car:'🚙',hotel:'🏨',food:'🍽',sightseeing:'🌿',stay:'🌙',home:'🏠'};
const fmtDate = value => new Intl.DateTimeFormat('en-IN',{weekday:'short',day:'2-digit',month:'short',year:'numeric'}).format(new Date(value+'T00:00:00'));
const fmtDateTime = value => new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',hour12:true}).format(new Date(value));

function setTabs(){
  document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn,.tab-panel').forEach(el=>el.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById(btn.dataset.tab).classList.add('is-active');
  }));
}

function journeyHTML(trip){
  return `<div class="journey-grid">${trip.days.map(day=>`
    <article class="day-card">
      <div class="day-heading">
        <div class="day-badge"><span>DAY</span><strong>${day.day}</strong></div>
        <div class="day-title"><h2>${day.title}</h2><p>${fmtDate(day.date)}</p></div>
      </div>
      <div class="timeline">
        ${day.events.map(event=>`
          <div class="event">
            <div class="event-dot">${icons[event.type] || '•'}</div>
            ${event.time ? `<div class="event-time">${event.time}</div>` : ''}
            <h3>${event.title}</h3>
            ${event.subtitle ? `<p>${event.subtitle}</p>` : ''}
            ${(event.distance || event.duration) ? `<div class="transfer-meta">${event.distance ? `<span>📍 ${event.distance}</span>` : ''}${event.duration ? `<span>⏱ Approx. ${event.duration.replace(/^~/,'')}</span>` : ''}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </article>
  `).join('')}</div>`;
}

function trainsHTML(trip){
  return `<div class="card-list">${trip.trains.map(train=>`
    <article class="detail-card">
      <p class="eyebrow">Train ${train.number}</p>
      <h2>${train.name}</h2>
      <p class="detail-card__sub">${train.from} → ${train.to}</p>
      <div class="route">
        <div class="route__point"><strong>${train.from}</strong><span>${fmtDateTime(train.departure)}</span></div>
        <div class="route__line"></div>
        <div class="route__point"><strong>${train.to}</strong><span>${fmtDateTime(train.arrival)}</span></div>
      </div>
      <div class="ticket-list">
        <strong>Tickets</strong>
        ${train.tickets?.length ? train.tickets.map(t=>`
          <div class="ticket-row"><span>📄 ${t.name}</span><a class="button ${t.url==='#'?'is-disabled':''}" href="${t.url}" ${t.url==='#'?'':'target="_blank" rel="noopener"'}>Download</a></div>
        `).join('') : '<p class="empty-note">No ticket links added yet.</p>'}
      </div>
    </article>
  `).join('')}</div>`;
}

function hotelsHTML(trip){
  return `<div class="card-list">${trip.hotels.map(h=>`
    <article class="detail-card">
      <p class="eyebrow">${h.place}</p>
      <h2>${h.name}</h2>
      <p class="detail-card__sub">${h.place}</p>
      <div class="info-grid">
        <div class="info-box"><span>Check-in</span><strong>${fmtDate(h.checkIn)}</strong></div>
        <div class="info-box"><span>Check-out</span><strong>${fmtDate(h.checkOut)}</strong></div>
        <div class="info-box"><span>Rooms</span><strong>${h.rooms || '—'}</strong></div>
        <div class="info-box"><span>Voucher</span><strong>${h.voucherUrl && h.voucherUrl !== '#' ? 'Available' : 'Not added'}</strong></div>
      </div>
      <div style="margin-top:16px"><a class="button ${!h.voucherUrl || h.voucherUrl==='#'?'is-disabled':''}" href="${h.voucherUrl || '#'}" ${h.voucherUrl && h.voucherUrl !== '#'?'target="_blank" rel="noopener"':''}>Download voucher</a></div>
    </article>
  `).join('')}</div>`;
}

async function init(){
  setTabs();
  try{
    const res = await fetch(DATA_URL); const {trips=[]} = await res.json();
    const trip = trips.find(t=>t.id===tripId) || trips[0];
    if(!trip) throw new Error('Trip not found');
    document.title = `${trip.title} — Trip`;
    document.getElementById('tripHero').innerHTML = `
      <p class="eyebrow">${trip.days.length}-day journey</p>
      <h1>${trip.title}</h1>
      <p class="muted">${trip.subtitle || ''}</p>
      <div class="trip-hero__meta"><span>${fmtDate(trip.startDate)}</span><span>→</span><span>${fmtDate(trip.endDate)}</span></div>`;
    document.getElementById('journey').innerHTML = journeyHTML(trip);
    document.getElementById('trains').innerHTML = trainsHTML(trip);
    document.getElementById('hotels').innerHTML = hotelsHTML(trip);
  }catch(err){
    document.getElementById('tripHero').innerHTML = `<p class="muted">${err.message}</p>`;
  }
}
init();
