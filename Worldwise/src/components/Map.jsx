import { useNavigate } from 'react-router-dom';
import { MapContainer,TileLayer,Marker,Popup, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css'
import { useCities } from '../contexts/CitiesContext';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { useGeoloaction } from '../hooks/useGeolocation';
import Button from './Button';
import { useURLPosition } from '../hooks/useURLPosition';
function Map() {
 
 const {cities}= useCities();
   const [mapPosition,setMapPostion]= useState([40,0]);
   const{isLoading:isLoadingPosition,position:geoLoactionPosition,getPosition}= useGeoloaction();
const [maplat,maplng]=useURLPosition();
   
useEffect(function(){
  if(maplat && maplng) setMapPostion ([maplat,maplng]) ;
},[maplat,maplng]);
useEffect(function(){if(geoLoactionPosition) setMapPostion()},[geoLoactionPosition])
    return (
        <div className ={styles.mapContainer} >
         {!geoLoactionPosition && ( <Button  type="position " onClick={getPosition}>
            {isLoadingPosition? "Loading...":"use your position"}
          </Button>)}
     <MapContainer 
    
    
     center={mapPosition} 
     zoom={6} 
     scrollWheelZoom={true} 
     className={styles.map}
    >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    { cities.map((City)=>(
        <>
    <Marker position={[City.position.lat,City.position.lng]} key={City.id}>
      <Popup>
     <span>{City.emoji}</span> <span>{City.cityName}</span>
      </Popup>
    </Marker></>))}
   <ChangeCenter position ={mapPosition} />
   <DetectClick />
  </MapContainer>cv             
        </div>
    );
}
function ChangeCenter({position}){
    const map=useMap();
    map.setView(position);
    return null;
}
ChangeCenter.propTypes = {
    position: PropTypes.any, // Add the missing prop type validation
    // Add the missing prop type validation
  };
function DetectClick (){
    const navigate=useNavigate();
    useMapEvents({
        click:() =>navigate('form'),});
}

  
export default Map;
