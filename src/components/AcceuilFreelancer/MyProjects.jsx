import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';
const MyProjects = () => {
    const [showForm, setShowForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [clientName, setClientName] = useState('');
    const [duration, setDuration] = useState('');

    const toggleForm = () => {
        setShowForm(!showForm);
    };
    useEffect(() => {
        const idfreelancer = localStorage.getItem("id");

        axios.get(`http://localhost:5000/submittedprojects/${idfreelancer}`)
            .then(response => {
                // Handle successful response 
                console.log('Submitted projects:', response.data);
                setProjects(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching submitted projects:', error);
            });

    }, [])


    const handleDelete = (index) => {
        // Remove the project from the projects array
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    };

    return (
        <div className='myprojects-container'>
            <h1>My Projects</h1>

            <table className="myprojects-table">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Client Name</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[...new Set(projects.map(project => project.idProjet.titre))].map((uniqueTitre, index) => (
                        <tr key={index}>
                            <td>{uniqueTitre}</td>
                            {/* Assuming idclient and duration are also unique for each project */}
                            <td>{projects.find(project => project.idProjet.titre === uniqueTitre).idclient.name}</td>
                            <td>{projects.find(project => project.idProjet.titre === uniqueTitre).duration}</td>
                            <td>
                                <Button className="status-btn" onClick={() => alert('Please contact us at -- freelanzo@gmail.com -- if you have not yet paid.')} title="Click to contact us if unpaid">
                                    <WarningIcon color="error" style={{ marginRight: '5px', color: 'white' }} />
                                    Unpaid
                                </Button>
                            </td>
                            <td>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(uniqueTitre)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>


            <small style={{ color: 'red' }}><strong>Note:</strong> If you send the project file to the client and the duration of the work is finished, but you haven't received your money, you can click the "Unpaid" button.</small>
        </div>
    );
}

export default MyProjects;
