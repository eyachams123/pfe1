import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ListFreelancers from './ListFreelancers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectsList = ({ onClose }) => {
    const navigate = useNavigate();
    const [iduser, setiduser] = useState("");
    const [nom, setnom] = useState("");
    const [posts, setPosts] = useState([]);
    const [idproject,setIdproject]=useState("");
    const [buttonState, setButtonState] = useState({
        button1Clicked: localStorage.getItem('button1Clicked') === 'true' || false,
        button2Clicked: localStorage.getItem('button2Clicked') === 'true' || false,
        button3Clicked: localStorage.getItem('button3Clicked') === 'true' || false,
        button4Clicked: localStorage.getItem('button4Clicked') === 'true' || false,
    });
    const [isListFreelancersOpen, setIsListFreelancersOpen] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');
        const iduser = localStorage.getItem('id');
        const nom = localStorage.getItem('name');
        setiduser(iduser)
        setnom(nom);

        if (!token || usertype !== "Client") {
            navigate('/');
        } else {
            const fetchData = async () => {
                try {
                    const postesResponse = await axios.get(`http://localhost:5000/getdataprojects/${iduser}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setPosts(postesResponse.data);
                    setIsListFreelancersOpen(Array(postesResponse.data.length).fill(false)); // Initialize with false for each post
                } catch (error) {
                    // Handle error
                }
            };

            fetchData();
        }
    }, [buttonState]);

    const toggleListFreelancers = (index) => {
        const newIsListFreelancersOpen = [...isListFreelancersOpen]; // Create a copy of the state array
        newIsListFreelancersOpen[index] = !newIsListFreelancersOpen[index]; // Toggle the value at the specified index
        setIsListFreelancersOpen(newIsListFreelancersOpen); // Update the state
    };

    const handleCloseListFreelancers = (index) => {
        const newIsListFreelancersOpen = [...isListFreelancersOpen]; // Create a copy of the state array
        newIsListFreelancersOpen[index] = false; // Close the list at the specified index
        setIsListFreelancersOpen(newIsListFreelancersOpen); // Update the state
    };

    const handleButtonClick = async (buttonName,projectid) => {
        const newState = {
            button1Clicked: buttonName === 'button1' ? true : false,
            button2Clicked: buttonName === 'button2' ? true : false,
            button3Clicked: buttonName === 'button3' ? true : false,
            button4Clicked: buttonName === 'button4' ? true : false,
        };
        setIdproject(projectid);
        setButtonState(newState);
        if (newState.button1Clicked){
            console.log(projectid);
            const response3= await axios.patch(`http://localhost:5000/projects/${projectid}/updateStatus`,{newStatus:"Unrealised"});
        }
        else if (newState.button2Clicked) {
            console.log(projectid);
            const response3= await axios.patch(`http://localhost:5000/projects/${projectid}/updateStatus`,{newStatus:"Realised"});
        }
        else if(newState.button3Clicked) {
            console.log(projectid);
            const response3= await axios.patch(`http://localhost:5000/projects/${projectid}/updateStatus`,{newStatus:"In progress"});
        }
        else if (newState.button4Clicked){
            console.log(projectid);
            const response3= await axios.patch(`http://localhost:5000/projects/${projectid}/updateStatus`,{newStatus:"Unsatisfied"});
        }
        localStorage.setItem('button1Clicked', newState.button1Clicked);
        localStorage.setItem('button2Clicked', newState.button2Clicked);
        localStorage.setItem('button3Clicked', newState.button3Clicked);
        localStorage.setItem('button4Clicked', newState.button4Clicked);
    };

    return (
        <div className="projectslist-container">
            <CloseIcon style={{ marginLeft: '550px', marginTop: '10px', color: 'red' }} className="close-button" onClick={onClose} />

            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>State</th>
                        <th>List Of Candidates</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((item, index) => (
                        <tr key={index}>
                            <td>{item.titre}</td>
                            <td>
                                <button className='state' onClick={() => handleButtonClick('button1',item._id)} style={{ color: item.status === 'Unrealised'  ? 'red' : 'initial' }}>Unrealised</button>
                                <button className='state' onClick={() => handleButtonClick('button2',item._id)} style={{ color: item.status === 'Realised'  ? '#20c997' : 'initial' }}>Realised</button>
                                <button className='state' onClick={() => handleButtonClick('button3',item._id)} style={{ color: item.status === 'In progress'  ? '#ff9409' : 'initial' }}>In progress</button>
                                <button className='state' onClick={() => handleButtonClick('button4',item._id)} style={{ color: item.status === 'Unsatisfied'  ? 'red' : 'initial' }}>Unsatisfied</button>
                            </td>
                            <td>
                                {item.listeCandidates.length !== 0 ? (
                                    <>
                                        <button onClick={() => toggleListFreelancers(index)}>Show List</button>
                                        <ListFreelancers listeCandidates={item.listeCandidates} idproject={item._id}  isOpen={isListFreelancersOpen[index]} onClose={() => handleCloseListFreelancers(index)} />
                                    </>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectsList;