import React, {useEffect, useState} from 'react';
import {Row,Col,Container} from "react-bootstrap";
import PatientInfo from "./PatientInfo";
import PatientList from "./PatientList";
import CovidMap from "./CovidMap";
import SliderBar from './Slider'; 
import {addDays} from "date-fns";

const constantDay = new Date("2019-12-8");
const CovidDashboard = (props) => {
    const [currentPatient, setCurrentPatient] = useState();
    const [currentPatientIndex, setCurrentPatientIndex] = useState();
    const [patients, setPatients] = useState([]);
    const [selectedDate, setSelectedDate] = useState(constantDay)
    let refs = [];
    let selectedPatientList = [];
    
    refs = patients.reduce((Patients,patient,index) => {
        Patients[index] = React.createRef();
        return Patients;
      }, {});

    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(
                (result) => {
                    setPatients(result.data);       
                },
            )
        
    }, [])

    useEffect(() => {
        scrollToRef(refs,currentPatientIndex);
    })

    patients.sort((a, b) => {
        if (a.verifyDate < b.verifyDate) { 
            return 1; }
        if (a.verifyDate > b.verifyDate) { 
            return -1; }
        return 0;
      });
    
    const updateCurrentPatient = (patient,index) => {
        setCurrentPatient(patient);
        setCurrentPatientIndex(index);
    }

    const scrollToRef = (refs,index) => {
        if (refs[index]) {
            refs[index].current.scrollIntoView({ behavior: 'smooth', block: 'start'});
        }        
    }

    const slideSlider = ([ms]) => {
        let date = new Date(ms);
        setSelectedDate(date);
    }

    const addSelectedDay = () => {
        setSelectedDate(selectedDate => addDays(selectedDate,1)); 
    }

    patients.map((Patients) => {
        let date = new Date(Patients.verifyDate); 
        if(date.getTime() <= selectedDate.getTime()){
            selectedPatientList =  selectedPatientList.concat(Patients);    
        }
    })

    return <Container>
        <Row>
            <Col xs={10}>
                <CovidMap 
                    patients = {selectedPatientList ? selectedPatientList : patients}
                    currentPatient = {currentPatient}
                    refs = {refs}
                    handleClick = {updateCurrentPatient}
                />
            </Col>
            <Col xs={2}>
                {currentPatient &&
                <PatientInfo 
                    name={currentPatient.name} 
                    address={currentPatient.address} 
                    note={currentPatient.note}
                    verifyDate={currentPatient.verifyDate}
                />}
            </Col>
        </Row>
        <Row>
            <Col xs={10}>
                <PatientList
                    patients = {selectedPatientList ? selectedPatientList : patients}
                    refs ={refs}
                    currentPatientIndex = {currentPatientIndex}
                    updateCurrentPatient = {updateCurrentPatient}
                />
            </Col>
        </Row>
        <Row>
            <Col xs={10}>
                <SliderBar 
                    slideSlider = {slideSlider} 
                    addSelectedDay = {addSelectedDay}/>
            </Col>
        </Row>
    </Container>
};

export default CovidDashboard;