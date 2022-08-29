import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import GoogleHybridTile from '../tiles/google-hybrid';
import GoogleStreetTile from '../tiles/google-street';

type Props = {
  satellite?: boolean;
};

const BasicMap = ({ satellite }: Props) => {
  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      {satellite ? <GoogleHybridTile /> : <GoogleStreetTile />}
    </MapContainer>
  );
};

export default BasicMap;
