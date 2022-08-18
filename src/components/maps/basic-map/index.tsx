import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Stack, Text, Title } from '@mantine/core';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const BasicMap = () => {
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
      <Marker position={[39.8283, -98.5795]}>
        <Popup>
          <Stack spacing={0}>
            <Title order={5}>Location #25</Title>
            <Text>Fireflies Seen: 24</Text>
          </Stack>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default BasicMap;
