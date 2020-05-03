import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const CovidMap = ({patients,currentPatient, handleClick}) => {
    var centerMap = {
        lat : currentPatient ? currentPatient.lat : 10.762887,
        lng : currentPatient ? currentPatient.lng : 106.6800684,
    }
    return <Map center={[centerMap.lat, centerMap.lng]} zoom={13}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {
            patients.map((patient,index) => 
                <Marker 
                    key = {index}
                    position={[patient.lat, patient.lng]} 
                    onclick = {() => {
                       handleClick(patient,index);
                    }}>
                    <Popup>
                        <ul>
                            <li>Name: {patient.name}</li>
                            <li>Address: {patient.address}</li>
                            <li>Note: {patient.note}</li>
                            <li>Verify date: {patient.verifyDate}</li>
                        </ul>
                    </Popup>
                </Marker>)}
    </Map>;
};

export default CovidMap;
