import { MapContainer, Marker, useMapEvent } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import GoogleHybridTile from '../tiles/google-hybrid';
import GoogleStreetTile from '../tiles/google-street';

type SelectLocationProps = {
  handleClick: (latlng: { lat: number; lng: number }) => void;
};

const SelectLocation = ({ handleClick }: SelectLocationProps) => {
  const map = useMapEvent('click', (e) => {
    handleClick(e.latlng.wrap());
    map.flyTo(e.latlng, 12);
  });

  return null;
};

type Props = {
  handleClick: (latlng: { lat: number; lng: number }) => void;
  markerPos?: { lat: number; lng: number } | null;
  satelite?: boolean;
};

const SelectMap = ({ handleClick, markerPos, satelite }: Props) => {
  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      {satelite ? <GoogleHybridTile /> : <GoogleStreetTile />}
      <SelectLocation handleClick={handleClick} />
      {markerPos && <Marker position={[markerPos.lat, markerPos.lng]} />}
    </MapContainer>
  );
};

export default SelectMap;
