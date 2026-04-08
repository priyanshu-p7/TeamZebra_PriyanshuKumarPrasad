import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';

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
  }, [lat, lng, map]);
  return null;
};

const LocationPicker = ({ latitude, longitude, onLocationSelect, readOnly = false, height }) => {
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
    <div className="flex flex-col gap-4 w-full h-full">
      <div 
        className="relative rounded-2xl overflow-hidden shadow-sm w-full" 
        style={{ height: height || (readOnly ? '250px' : '350px'), border: '1px solid var(--border)' }}
      >
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
            className="btn-secondary !py-2 !px-5 text-sm flex items-center gap-2 shadow-sm border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            {locating ? (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Navigation size={16} />
            )}
            <span className="font-semibold">{locating ? 'Locating...' : 'Use My Location'}</span>
          </button>
          
          {position ? (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              {position[0].toFixed(4)}, {position[1].toFixed(4)}
            </span>
          ) : (
            <span className="text-xs font-medium text-slate-500">
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
          className="inline-flex w-full sm:w-max items-center justify-center gap-2 mt-1 px-6 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-bold hover:bg-blue-100 transition-colors shadow-sm no-underline"
        >
          <MapPin size={18} /> Open in Google Maps
        </a>
      )}
    </div>
  );
};

export default LocationPicker;
