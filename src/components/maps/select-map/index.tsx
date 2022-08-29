import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

type SelectLocationProps = {
  handleClick: (latlng: { lat: number; lng: number }) => void;
};

const SelectLocation = ({ handleClick }: SelectLocationProps) => {
  const map = useMapEvent('click', (e) => {
    handleClick(e.latlng);
    map.flyTo(e.latlng, 12);
  });

  return null;
};

type Props = {
  handleClick: (latlng: { lat: number; lng: number }) => void;
  markerPos?: { lat: number; lng: number } | null;
};

const SelectMap = ({ handleClick, markerPos }: Props) => {
  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <SelectLocation handleClick={handleClick} />
      {markerPos && <Marker position={[markerPos.lat, markerPos.lng]} />}
    </MapContainer>
  );
};

export default SelectMap;
