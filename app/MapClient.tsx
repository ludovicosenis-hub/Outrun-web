'use client';

import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

/* ISO numeric codes */
const LIVE = new Set([826, 380, 724]); // UK, Italy, Spain


export default function MapClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div style={{ width: '100%', height: '100%', background: '#07070f', position: 'relative' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [-2, 46], scale: 700 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => {
              const id = Number(geo.id);
              const isLive = LIVE.has(id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isLive ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.12)',
                      stroke: isLive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)',
                      strokeWidth: isLive ? 0.7 : 0.5,
                      outline: 'none',
                    },
                    hover: {
                      fill: isLive ? '#fff' : 'rgba(255,255,255,0.18)',
                      stroke: isLive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.22)',
                      strokeWidth: isLive ? 0.7 : 0.5,
                      outline: 'none',
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>

      </ComposableMap>
    </div>
  );
}
