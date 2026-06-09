'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const F_BODY = "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif";

const events = [
  { id: 1,  name: 'RunUnity × Cafe Nini',   city: 'Vienna',      date: 'SAT 6 Jun',  dist: '5 km',   going: 38,  lat: 48.2082, lng: 16.3738,  poster: '/events/event1.jpeg' },
  { id: 2,  name: 'Gypsy Rabbit Social Run', city: 'Canterbury',  date: 'THU 12 Jun', dist: '6 km',   going: 31,  lat: 51.2802, lng: 1.0789,   poster: '/events/event2.jpeg' },
  { id: 3,  name: 'REM: Run the Extra Mile', city: 'Milan',        date: 'SUN 14 Jun', dist: '8 km',   going: 26,  lat: 45.4823, lng: 9.1783,   poster: '/events/event3.jpeg' },
  { id: 4,  name: 'B3TTER Run Club × Nike',  city: 'Madrid',       date: 'SAT 28 Nov', dist: '6 km',   going: 64,  lat: 40.4153, lng: -3.6844,  poster: '/events/event4.jpeg' },
  { id: 5,  name: 'Rookie Wednesday Run',    city: 'Lisbon',       date: 'WED 17 Jun', dist: '5 km',   going: 34,  lat: 38.7077, lng: -9.1463,  poster: '/events/event5.jpeg' },
  { id: 6,  name: 'Onemind Sunday Run',      city: 'Paris',        date: 'SUN 6 Jul',  dist: '5 km',   going: 31,  lat: 48.8497, lng: 2.3085,   poster: '/events/poster_onemind.jpeg' },
  { id: 7,  name: 'Coffee Party Run & Rave', city: 'Shanghai',     date: 'FRI 20 Jun', dist: '5 km',   going: 58,  lat: 31.2244, lng: 121.466,  poster: '/events/poster_raveam.jpeg' },
  { id: 8,  name: 'Dreamers Morning Run',    city: 'San Antonio',  date: 'FRI 19 Jun', dist: '4.8 km', going: 22,  lat: 29.4089, lng: -98.4826, poster: '/events/poster_dreamers.jpeg' },
  { id: 9,  name: 'BOMJA Saturday Run',      city: 'Minneapolis',  date: 'SAT 23 May', dist: '6 km',   going: 47,  lat: 44.9964, lng: -93.2714, poster: '/events/poster_bomja.jpeg' },
  { id: 10, name: 'HOKA Coffee Fest Run',    city: 'Rotterdam',    date: 'SAT 11 Oct', dist: '5 km',   going: 85,  lat: 51.9225, lng: 4.4792,   poster: '/events/poster_rc010.jpeg' },
  { id: 11, name: 'Night Run',               city: 'Kathmandu',    date: 'FRI 11 Jul', dist: '5 km',   going: 19,  lat: 27.7172, lng: 85.324,   poster: '/events/poster_nightrunners.jpeg' },
];

function createPosterIcon(poster: string) {
  return L.divIcon({
    className: '',
    html: `<div style="width:52px;height:66px;display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 6px 16px rgba(0,0,0,0.8));">
      <div style="width:52px;height:52px;border-radius:12px;overflow:hidden;border:1.5px solid rgba(255,255,255,0.22);">
        <img src="${poster}" style="width:100%;height:100%;object-fit:cover;display:block;">
      </div>
      <div style="width:2px;height:10px;background:rgba(255,255,255,0.45);border-radius:0 0 2px 2px;"></div>
      <div style="width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,0.6);margin-top:-1px;"></div>
    </div>`,
    iconSize: [52, 66],
    iconAnchor: [26, 66],
    popupAnchor: [0, -72],
  });
}

export default function MapClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <MapContainer
      center={[48, 8]}
      zoom={5}
      style={{ width: '100%', height: '100%', background: '#07070f' }}
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        maxZoom={20}
      />

      {events.map(ev => (
        <Marker key={ev.id} position={[ev.lat, ev.lng]} icon={createPosterIcon(ev.poster)}>
          <Popup closeButton={false} className="outrun-popup" offset={[0, -4]}>
            <div style={{
              background: 'rgba(12,12,22,0.96)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              overflow: 'hidden',
              width: 230,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              fontFamily: F_BODY,
            }}>
              <div style={{ position: 'relative', height: 120, overflow: 'hidden' }}>
                <img src={ev.poster} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,12,22,0.6), transparent)' }} />
              </div>
              <div style={{ padding: '14px 16px 16px' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 5 }}>
                  {ev.city} · {ev.date}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: 10 }}>
                  {ev.name}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.08)', borderRadius: 100, padding: '3px 10px', color: 'rgba(255,255,255,0.65)' }}>
                    {ev.dist}
                  </span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>{ev.going} going</span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
