import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const TrainingsList = ({ onClose, isOpen,formations }) => {
    const handleFinish=()=>{

    }
    const handleUnsatisfied=()=>{
        
    }
    return (
        <div className={`trainingsList-container ${isOpen ? 'open' : ''}`}>
            <CloseIcon style={{ marginLeft: '880px', marginTop: '10px', color: 'red' }} className="close-button" onClick={onClose} /> {/* Close icon */}
            <table style={{ marginLeft: '50px' }}>
                <thead>
                    <tr>
                        <th>Training Name</th>
                        <th>Trainer</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                {formations.map((formation, index) => (
            <tr key={index}>
                <td>{formation.domain}</td>
                <td>{formation.auteur}</td>
                <td>{formation.startdate}</td>
                <td>{formation.enddate}</td>
                <td>
                    <button onClick={() => handleFinish(index)}>Finished</button>
                    <button onClick={() => handleUnsatisfied(index)}>Unsatisfied</button>
                </td>
            </tr>
        ))}
                    {/* Add more rows for additional trainings */}
                </tbody>
            </table>
            <p style={{ marginLeft: '50px', marginBottom: '10px', fontSize: '14px' ,color:'red'}}>
                <strong>Note:</strong>If you have received the certificate of attendance for a training, please click the "Finished" button.<br/> 
                If you have not received any certificate, link to the training, or other materials, please click the "Unsatisfied" button.
            </p>
        </div>
    );
}

export default TrainingsList;
