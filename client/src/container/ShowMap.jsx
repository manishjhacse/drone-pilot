import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
export default function ShowMap({pilots,adminLocation}) {
    const redMarkerIcon = new L.Icon({
        iconUrl: 'https://freepngimg.com/thumb/symbol/62766-map-symbol-computer-location-icons-free-download-png-hd.png',
        iconSize: [35, 35],
      });
      
    const blueMarkerIcon = new L.Icon({
        iconUrl: 'https://freepngimg.com/thumb/map/66930-map-google-icons-collection-maps-computer-marker.png',
        iconSize: [35, 35],
      });
      
    return (
        <MapContainer center={[23.2599, 77.4126]} zoom={5} scrollWheelZoom={true} className='h-full z-10 rounded-md overflow-y-scroll' >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pilots?.map(pilot => (
                <Marker icon={blueMarkerIcon}  key={pilot?._id} position={[pilot?.coordinates?.latitude, pilot?.coordinates?.longitude]}>
                    <Popup>
                        <div className='flex flex-col items-center gap-1'>
                            <img src={pilot?.profileImage} className='rounded-full h-16 w-16' alt="" />
                        <h1 className='font-bold'>{pilot?.name}</h1>
                        <span className='flex items-center'>Experience: {pilot?.workExperience} years</span>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {adminLocation && (
                <Marker icon={redMarkerIcon} position={[adminLocation.latitude, adminLocation.longitude]}>
                    <Popup>Your Location</Popup>
                </Marker>
            )}
        </MapContainer>
    )
}
