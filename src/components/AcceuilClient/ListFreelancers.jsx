import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Sure from './Sure';

const ListFreelancers = ({ onClose, isOpen, listeCandidates, idproject }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [selectedFreelancerId, setSelectedFreelancerId] = useState(null); // State to store the selected freelancer's id
    const [isSureOpen, setIsSureOpen] = useState(() => {
        return listeCandidates.map(() => false);
    });

    const toggleSure = (index, idfreelancer) => {
        const newIsSureOpen = [...isSureOpen]; // Create a copy of the state array
        newIsSureOpen[index] = !newIsSureOpen[index]; // Toggle the state for the selected candidate
        setIsSureOpen(newIsSureOpen); // Update the state
        if (newIsSureOpen[index]) {
            setSelectedFreelancerId(idfreelancer); // Store the idfreelancer of the selected candidate when opening the modal
        }
    };

    const handleCloseSure = (index) => {
        const newIsSureOpen = [...isSureOpen]; // Create a copy of the state array
        newIsSureOpen[index] = false; // Close the modal for the selected candidate
        setIsSureOpen(newIsSureOpen); // Update the state
    };

    const handleCoverLetter = (coverletter) => {
        console.log(coverletter);
        window.open(`/coverletter?nomclient=${coverletter.nomclient}&contenu=${encodeURIComponent(coverletter.contenu)}&nom=${coverletter.nom}`, '_blank');

    };

    return (
        <div className={`show-container ${isOpen ? 'open' : ''}`}>
            <CloseIcon style={{ marginLeft: '450px', marginTop: '10px', color: 'red' }} className="close-button" onClick={onClose} /> {/* Close icon */}

            <table style={{ marginLeft: '10px' }}>
                <thead>
                    <tr>
                        <th>Name of the Freelancer</th>
                        <th>Price</th>
                        <th>Cover letter</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over the candidates array */}
                    {listeCandidates.length !== 0 && listeCandidates.map((candidate, index) => (
                        <tr key={index}>
                            <td>{candidate.nom}</td>
                            <td>{candidate.price}</td>
                            <td>
                            <a style={{ cursor: 'pointer' }} onClick={() => handleCoverLetter(candidate.coverletter)}>Cover Letter</a>

                            </td>
                            <td>
                                <button onClick={() => toggleSure(index, candidate.idfreelancer)}>Commit</button>
                                {/* Pass isOpen and onClose props to the Sure modal */}
                                <Sure idproject={idproject} isOpen={isSureOpen[index]} onClose={() => handleCloseSure(index)} selectedFreelancerId={selectedFreelancerId} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListFreelancers;
