import { MapContainer, Marker } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import GoogleHybridTile from '../tiles/google-hybrid';
import GoogleStreetTile from '../tiles/google-street';

type Props = {
  markerPos: { lat: number; lng: number };
  satelite?: boolean;
};

const MarkerMap = ({ markerPos, satelite }: Props) => {
  return (
    <MapContainer
      center={[markerPos.lat, markerPos.lng]}
      zoom={15}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      {satelite ? <GoogleHybridTile /> : <GoogleStreetTile />}
      <Marker position={[markerPos.lat, markerPos.lng]} />
    </MapContainer>
  );
};

export default MarkerMap;
