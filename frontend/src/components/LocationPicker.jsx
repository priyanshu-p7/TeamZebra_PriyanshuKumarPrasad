import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to handle map clicks
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Component to recenter map
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng]);
  return null;
};

const LocationPicker = ({ latitude, longitude, onLocationSelect, readOnly = false }) => {
  const [position, setPosition] = useState(
    latitude && longitude ? [latitude, longitude] : null
  );
  const [locating, setLocating] = useState(false);

  // Default center: India
  const defaultCenter = [20.5937, 78.9629];
  const center = position || defaultCenter;
  const zoom = position ? 15 : 5;

  useEffect(() => {
    if (latitude && longitude) {
      setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  const handleClick = (lat, lng) => {
    if (readOnly) return;
    setPosition([lat, lng]);
    onLocationSelect?.(lat, lng);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng]);
        onLocationSelect?.(lat, lng);
        setLocating(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        alert('Unable to get your location. Please allow location access.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative rounded-xl overflow-hidden" style={{ height: readOnly ? '200px' : '300px', border: '1px solid var(--border)' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!readOnly && <MapClickHandler onLocationSelect={handleClick} />}
          {position && <Marker position={position} />}
          {position && <RecenterMap lat={position[0]} lng={position[1]} />}
        </MapContainer>
      </div>

      {!readOnly && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLocateMe}
            disabled={locating}
            className="btn-secondary !py-2 !px-4 text-sm flex items-center gap-2"
          >
            {locating ? (
              <div className="w-4 h-4 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            ) : (
              '📍'
            )}
            {locating ? 'Locating...' : 'Use My Location'}
          </button>
          {position && (
            <span className="text-xs text-[var(--text-muted)]">
              {position[0].toFixed(4)}, {position[1].toFixed(4)}
            </span>
          )}
          {!position && (
            <span className="text-xs text-[var(--text-muted)]">
              Click on the map or use your location
            </span>
          )}
        </div>
      )}

      {readOnly && position && (
        <a
          href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--primary-light)] hover:underline no-underline flex items-center gap-1"
        >
          📍 Open in Google Maps →
        </a>
      )}
    </div>
  );
};

export default LocationPicker;
