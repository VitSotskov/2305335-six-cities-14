import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { OfferLocation } from '../../types/offer-location';
import { OfferPreviewType } from '../../types/offer-preview';

type MapProps = {
  location: OfferLocation;
  block: string;
  offers: OfferPreviewType[];
  specialOfferId: OfferPreviewType['id'] | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

export default function Map(props: MapProps): JSX.Element {
  const {location, block, offers, specialOfferId} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [map, location]);

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map); // fix

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(
          offer.id === specialOfferId
            ? currentCustomIcon
            : defaultCustomIcon
        )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, specialOfferId]);

  return (
    <section
      className={`${block}__map map`}
      ref={mapRef}
      style={{
        height: '100%',
        minHeight: '500px',
        width: '100%',
        maxWidth: '1144px',
        margin: '0 auto',
      }}
    />
  );
}
