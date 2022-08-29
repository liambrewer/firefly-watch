import { TileLayer } from 'react-leaflet';

const GoogleStreetTile = () => {
  return (
    <TileLayer
      url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
      attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
      subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
    />
  );
};

export default GoogleStreetTile;
