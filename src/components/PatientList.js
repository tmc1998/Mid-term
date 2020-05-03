import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../index.css'
const PatientList = ({patients, refs, currentPatientIndex, updateCurrentPatient}) => {
    return (
        <ListGroup lass="list-group" as = "ul"> 
                {
                    patients.map((patient,index) =>
                    {
                        return(
                            <ListGroup.Item lass = "list-group-item" as = "li" 
                                key = {index} 
                                ref={refs[index]} 
                                onClick={() => updateCurrentPatient(patient,index)}
                                active = {index === currentPatientIndex ? true : false}
                            >
                                {patient.name}
                            </ListGroup.Item>
                        );
                    })
                }
        </ListGroup>
    );
}

export default PatientList;
