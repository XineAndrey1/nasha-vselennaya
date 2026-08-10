
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { locations } from '@/data/locations';
import styles from './Map.module.scss';

// Исправляем иконки Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Map() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [55.7558, 37.6173],
        zoom: 12,
        zoomControl: false, // Убираем контролы для чистоты
        attributionControl: false,
      });

      // Романтичный стиль карты (бело-розовый)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CartoDB',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 3,
      }).addTo(map);

      mapRef.current = map;

      // Добавляем маркеры-сердечки
      locations.forEach((location) => {
        // Создаём кастомную иконку-сердечко
        const heartIcon = L.divIcon({
          className: styles.customMarker,
          html: `❤️`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        });

        const marker = L.marker([location.lat, location.lng], {
          icon: heartIcon,
        }).addTo(map);

        // Содержимое попапа
        const popupContent = `
          <div class="${styles.popupContent}">
            <span class="${styles.popupEmoji}">${location.emoji || '💕'}</span>
            <h3>${location.name}</h3>
            ${location.date ? `<p class="${styles.popupDate}">${location.date}</p>` : ''}
            <div class="${styles.popupDivider}"></div>
            <img 
              src="${location.image}" 
              alt="${location.name}"
              class="${styles.popupImage}"
              onerror="this.style.display='none'" 
            />
            <p class="${styles.popupDescription}">${location.description}</p>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          minWidth: 200,
          className: styles.customPopup,
          closeButton: true,
          autoPan: true,
        });
      });

      // Добавляем адаптивный зум для мобильных
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        map.setZoom(11);
      }

      // Обновляем размер карты
      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      // Обработчик ресайза
      const handleResize = () => {
        map.invalidateSize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, []);

  return <div ref={mapContainerRef} className={styles.mapContainer} />;
}