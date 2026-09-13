# Purulia • Ghatsila • Jhargram Trip Site

Upload this entire folder to:

`https://my-server.com/trip/`

## Edit trip information

All content is inside:

`data/trips.json`

Replace placeholder hotel names, ticket URLs and hotel voucher URLs directly in that file.

## Important placeholders

- `HOTEL NAME 1` — Baranti
- `HOTEL NAME 2` — Ghatsila
- `HOTEL NAME 3` — Jhargram
- Ticket URLs currently set to `#`
- Hotel voucher URLs currently set to `#`

## Notes on supplied times

The first train arrival was normalized to **09:31 AM** because a 06:39 AM departure followed by a 09:31 PM arrival for Sheoraphuli → Asansol appears inconsistent with the itinerary.

The Asansol → Adityapur arrival was normalized to **12:50 PM** because the supplied `12.50 am` appears inconsistent with a 09:00 AM departure and same-day onward travel to Ghatsila.

Verify both times against the tickets before publishing.

## Server requirements

No Node.js, npm or build process is needed. Any normal static web server is enough.

## Transfer distance and approximate time
The Journey tab supports optional `distance` and `duration` fields for transfer events. This trip currently includes:

- Asansol Station → Baranti: 36 km, approx. 1 hr 15 min
- Adityapur Station → Ghatsila: 55 km, approx. 1 hr 30 min
- Jhargram Station → Hotel: 5–10 km, approx. 15–25 min

The times are planning estimates only. Update them in `data/trips.json` if you later have more accurate values.
