import React, { useState, useEffect, useRef } from 'react';
import '../AcceuilFreelancer/AcceuilFreelancer.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import BellIcon from '@mui/icons-material/Notifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SearchIcon from '@mui/icons-material/Search';
import { Margin } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Comment from '../cmt/CommentSection';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BasketContainer from './BasketContainer';


const AcceuilClient = () => {
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [ispostchosen, setidpostchosen] = useState("");

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
    const [isTrainingFormOpen, setIsTrainingFormOpen] = useState(false);
    //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [annonces, setAnnonces] = useState([]);
    const [ProjectPosts, setProjectPosts] = useState([]);
    const [TrainingPosts, setTrainingPosts] = useState([]);

    const [modalDataProject, setModalDataProject] = useState(null);
    const [showModalProject, setShowModalProject] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [modalDataTraining, setModalDataTraining] = useState(null);
    const [showModalTraining, setShowModalTraining] = useState(false);
    const [iduser, setiduser] = useState("");
    const [nom, setnom] = useState("");
    const [isBasketOpen, setIsBasketOpen] = useState(false);

    const [formData, setFormData] = useState({
        auteur: '',
        activityProject: '',
        domainProject: '',
        descriptionProject: '',
        budgetProject: '',
        deadline: '', // Include the deadline
        Skills: '',

    });
    const [formData1, setFormData1] = useState({
        descriptionTraining: '',
        domainTraining: '',
        auteur: '',

    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleInputChange1 = (event) => {
        const { name, value } = event.target;
        setFormData1({ ...formData1, [name]: value });
    };

    const toggleBasket = () => {
        setIsBasketOpen(!isBasketOpen);
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');
        const iduser = localStorage.getItem('id');
        const nom = localStorage.getItem('name');
        setiduser(iduser)
        setnom(nom);
        console.log(iduser);
        console.log(nom);
        if (!token || usertype !== "Client") {
            // Redirect to '/'
            navigate('/');
        } else {
            // Fetch data from multiple endpoints
            const fetchData = async () => {
                try {
                    const annoncesResponse = await axios.get('http://localhost:5000/annoncesformations', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const postesclResponse = await axios.get(`http://localhost:5000/clientGetPostesClients/${iduser}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const postesResponse = await axios.get(`http://localhost:5000/postesfreelancers/${iduser}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    // Merge the data from all endpoints into a single array

                    // Set the merged data to the posts state
                    setPosts(postesResponse.data);
                    setAnnonces(annoncesResponse.data);
                    setTrainingPosts(postesclResponse.data);
                } catch (error) {
                    // Handle error
                }
            };

            // Call the fetchData function
            fetchData();
        }








        const searchContainerClickHandler = () => {
            const searchContainer = document.getElementById('searchContainer');
            searchContainer.classList.toggle('clicked');
            document.getElementById('searchInput').focus();
        };

        const searchIconClickHandler = () => {
            const searchContainer = document.getElementById('searchContainer');
            searchContainer.classList.toggle('show-input');
            if (searchContainer.classList.contains('show-input')) {
                document.getElementById('searchInput').focus();
            }
        };

        const searchContainer = document.getElementById('searchContainer');
        const searchIcon = document.getElementById('searchIcon');

        searchContainer.addEventListener('click', searchContainerClickHandler);
        searchIcon.addEventListener('click', searchIconClickHandler);

        return () => {
            searchContainer.removeEventListener('click', searchContainerClickHandler);
            searchIcon.removeEventListener('click', searchIconClickHandler);
        };
    }, []);


    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };


    const toggleSidebar = () => {
        // setIsSidebarOpen(prev => !prev);// Update isSidebarOpen state
        const body = document.querySelector("body");
        const sidebar = body.querySelector(".sidebar");
        sidebar.classList.toggle("close");
    };

    const toggleModeSwitch = () => {
        setIsDarkMode(!isDarkMode);
        const body = document.querySelector("body");
        const modeText = body.querySelector(".mode-text");

        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Dark Mode";
        } else {
            modeText.innerText = "Light Mode";
        }
    };

    {/*   PROJECT FUNCTIONS   */ }
    const toggleProjectForm = () => {
        setIsProjectFormOpen(!isProjectFormOpen);
        const form = document.getElementById("ProjectForm");

        form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
    };

    const closeProjectForm = () => {
        document.getElementById("ProjectForm").style.display = "none";
        setIsProjectFormOpen(false); // Also set isProjectFormOpen state to false
    };

    const submitProjectForm = (event) => {
        event.preventDefault();

        // Extract form data
        const activityProject = document.getElementById('activityProject').value;
        const domainProject = document.getElementById('domainProject').value;
        const descriptionProject = document.getElementById('descriptionProject').value;
        const budgetProject = document.getElementById('budgetProject').value;
        const deadline = document.getElementById('deadline').value; // Add deadline

        // Create a new post object
        const newProjectPost = {
            auteur: nom,
            titre: activityProject,
            domain: domainProject,
            description: descriptionProject,
            Budget: budgetProject,
            Deadline: deadline, // Include the deadline
            Skills
        };
        console.log(newProjectPost);
        // Add the new post to the beginning of the ProjectPosts array
        const endpointURL = 'http://localhost:5000/createProjet/' + iduser;
        setProjectPosts([newProjectPost, ...ProjectPosts]);
        axios.post(endpointURL, newProjectPost)
            .then(response => {
                console.log('Post request successful:', response.data);
                // Handle successful response here if needed
            })
            .catch(error => {
                console.error('Error making post request:', error);
                // Handle error here if needed
            });

        // Close the form and reset the form fields
        closeProjectForm();
    };


    const toggleProjectDetails = (post) => {
        setModalDataProject({
            title: post.activityProject,
            domainProject: post.domainProject,
            description: post.description,
            budget: post.budget,
            skills: post.Skills // Add the 'Skills' array to the modal data
        });
        setShowModalProject(true);
    };

    const closeModalProject = () => {
        setShowModalProject(false);
    };


    {/*   TRAINNG FUNCTIONS   */ }


    const toggleTrainingForm = () => {
        setIsTrainingFormOpen(!isTrainingFormOpen);
        const form = document.getElementById("TrainingForm");

        form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
    };

    const closeTrainingForm = () => {
        document.getElementById("TrainingForm").style.display = "none";
        setIsTrainingFormOpen(false); // Also set isTrainingFormOpen state to false
    };

    const submitTrainingForm = (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        // Extract form data

        const domainTraining = document.getElementById('domainTraining').value;
        const descriptionTraining = document.getElementById('descriptionTraining').value;


        // Create a new post object
        const newTrainingPost = {
            auteur: nom,
            domainTraining,
            descriptionTraining
        };
        console.log(nom);
        const endpointURL = 'http://localhost:5000/createPosteClient/' + iduser;

        // Add the new post to the beginning of the TrainingPosts array

        axios.post(endpointURL, newTrainingPost)
            .then(response => {
                console.log('Post request successful:', response.data);
                // Handle successful response here if needed
            })
            .catch(error => {
                console.error('Error making post request:', error);
                // Handle error here if needed
            });

        // Close the form and reset the form fields
        // Close the form and reset the form fields
        closeTrainingForm();
        //event.target.reset();
    };

    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };


    const toggleTrainingDetails = (post) => {
        setidpostchosen(post._id);

        setModalDataTraining({
            domainTraining: post.domainTraining,
            descriptionTraining: post.descriptionTraining,
        });
        setShowModalTraining(true);
    };


    const closeModalTraining = () => {
        setShowModalTraining(false);
    };
    const toggleDetails = (post) => {
        setidpostchosen(post._id);

        console.log(post._id);
        setModalData({
            description: post.description,
            files: post.files
        });
        setShowModal(true);
    };
    const toggleDetails2 = (post) => {
        setidpostchosen(post._id);
        console.log(post._id);
        setModalData({
            contenu: post.contenu,
            modedelivery: post.modedelivery,
        });
        setShowModal2(true);
    };
    const redirecttocard = async (id) => {
        const queryParams = new URLSearchParams({ id: id }).toString();
        navigate(`/cardprofile?${queryParams}`);
    }
    const redirecttocardcl = async (id) => {
        const queryParams = new URLSearchParams({ id: id }).toString();
        navigate(`/cardprofilecl?${queryParams}`);
    }
    const redirecttocardfo = async (id) => {
        const queryParams = new URLSearchParams({ id: id }).toString();
        navigate(`/cardprofilefo?${queryParams}`);
    }
    const gotoprofile = async () => {

        navigate("/profileclient");
    }
    const handleContinue = () => {
        navigate(`/inscritFormation`);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const closeModal2 = () => {
        setShowModal2(false);
    };
    //This is Skills inpu

    const predefinedSkills = [
        "JavaScript", "HTML", "CSS", "Python", "React", "Angular", "Vue.js", "Node.js",
        "Java", "C++", "Ruby", "PHP", "Swift", ".NET", "SQL", "MongoDB", "Firebase", "Git",
        "Docker", "AWS", "Azure", "Google Cloud", "TensorFlow", "PyTorch",
        "Natural Language Processing (NLP)", "Computer Vision", "UI/UX Design", "Graphic Design",
        "Adobe Creative Suite", "Content Writing", "Copywriting", "Blogging", "Social Media Management",
        "SEO (Search Engine Optimization)", "Digital Marketing", "Data Analysis", "Machine Learning",
        "Project Management", "Agile Methodology", "Problem Solving", "Critical Thinking",
        "Communication Skills", "Team Collaboration", "Time Management", "Leadership",
        "Public Speaking", "Customer Service", "Sales", "Financial Analysis", "Statistical Analysis",
        "Language Translation", "Cybersecurity", "Blockchain", "Internet of Things (IoT)"
    ];

    const [Skills, setSkills] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue) {
            // Prevent form submission
            event.preventDefault();
            // Add skill if it's not already in the list
            if (!Skills.includes(inputValue)) {
                setSkills([...Skills, inputValue]);
                setInputValue('');
            }
        }
    };

    const handleDelete = (skillToDelete) => {
        setSkills(Skills.filter((skill) => skill !== skillToDelete));
    };
    const handleLogout = async () => {

        // Clear authentication data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('usertype');

        // Redirect to a specific location, such as '/'
        navigate('/');
    };
    return (
        <div className='acceuil'>
            <div className='menu1'>
                <nav className="sidebar close ">
                    <header>
                        <div className="image-text">
                            <span className="image">
                                <img src={require('../images/logo.png')} alt="logo" />
                            </span>
                            <div className="text header-text">
                                <span className="name">Freelanzo</span>
                            </div>
                        </div>
                        <ChevronRightIcon className='toggle' onClick={toggleSidebar} />
                    </header>
                    <div className="menu-bar">
                        <div className="menu">
                            <ul className="menu-links">
                                <li className="nav-link">
                                    <a href="#">
                                        <HomeIcon className='icon' />
                                        <span className="text nav-text">Home</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a onClick={gotoprofile}>
                                        <AccountCircleIcon className='icon' />
                                        <span className="text nav-text">Profile</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <ChatIcon className='icon' />
                                        <span className="text nav-text">Conversations</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#" onClick={toggleProjectForm}>
                                        <AddCircleIcon className='icon' />
                                        <span className="text nav-text">Add Project Request</span>
                                    </a>
                                </li>
                               
                                <li className="nav-link">
                                    <a href="#" onClick={toggleTrainingForm}>
                                        <AddCircleIcon className='icon' />
                                        <span className="text nav-text">Add Training Request</span>
                                    </a>
                                </li>
                                <li className="nav-link" onClick={toggleBasket}>
                                    <a href="#">
                                        <ShoppingCartIcon className='icon' />
                                        <span className="text nav-text">Basket</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <HelpIcon className='icon' />
                                        <span className="text nav-text">Help</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="bottom-content">
                            <li className="nav-link">
                                <a onClick={handleLogout}>
                                    <LogoutIcon className='icon' />
                                    <span className="text nav-text">Logout</span>
                                </a>
                            </li>
                            <li className="mode" onClick={toggleModeSwitch}>
                                {isDarkMode ? (
                                    <>
                                        <DarkModeIcon className='icon' />
                                        <span className="mode-text text">Dark Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <LightModeIcon className='icon' />
                                        <span className="mode-text text">Light Mode</span>
                                    </>
                                )}
                                <div className="toggle-switch">
                                    <span className={`switch ${isDarkMode ? 'dark' : 'light'}`} />
                                </div>
                            </li>
                        </div>
                    </div>
                </nav>
                {isProjectFormOpen && (
                    <div className="Projectform-container">
                        <form id="addProjectForm">
                            {/* Your form elements */}
                            <button type="submit">Submit</button>
                            <button type="button" onClick={closeProjectForm}>Cancel</button>
                        </form>
                    </div>
                )}

                {isTrainingFormOpen && (
                    <div className="Trainingform-container">
                        <form id="addTrainingForm">
                            {/* Your form elements */}
                            <button type="submit">Submit</button>
                            <button type="button" onClick={closeTrainingForm}>Cancel</button>
                        </form>
                    </div>
                )}
                <section className="home">

                    <div className="top-buttons">

                        <button id="button1">Find Talents</button>
                        <button id="button2">Learn</button>

                        <div id="notification" className="notification-icon">
                            <BellIcon />
                        </div>
                        <div id="fullscreen" className="fullscreen-icon" onClick={toggleFullScreen}>
                            <FullscreenIcon />
                        </div>

                        <div className="search" id="searchContainer">
                            <SearchIcon id="searchIcon" />
                            <input type="text" name="search" placeholder="Search.." id="searchInput" />
                        </div>

                    </div>
                    <div className="container1">
                        <p>Embark on a creative journey,<br />
                            Dive into a world of top freelancers,<br />
                            learn the art of freelancing,<br />
                            and showcase your Skills.<br /></p>
                    </div>
                    {/* Form section */}
                    <div id="ProjectForm" className="Projectform-container">
                        <form id="addProjectForm">
                            <h1 style={{ textAlign: 'left', marginLeft: '20px', fontFamily: 'Fira Code, monospace', fontWeight: '700' }}>Add Project Request</h1>
                            <label htmlFor="activityProject" style={{ textAlign: 'left', marginLeft: '20px', marginTop: '35px' }}>Activity:</label>
                            <input type="text" id="activityProject" name="activityProject" required />

                            <label htmlFor="domainProject" style={{ textAlign: 'left', marginLeft: '20px' }}>Domain:</label>
                            <select id="domainProject" name="domainProject" required>
                                <option value="">Select Domain</option>
                                <option value="Programming">Programming</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Software Development">Software Development</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Content Writing">Content Writing</option>
                                <option value="Project Management">Project Management</option>
                                <option value="Business Analysis">Business Analysis</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                            </select>

                            <label htmlFor="descriptionProject" style={{ textAlign: 'left', marginLeft: '20px' }}>Description:</label>
                            <textarea id="descriptionProject" name="descriptionProject" required></textarea>

                            <label htmlFor="skills" style={{ textAlign: 'left', marginLeft: '20px' }}>Skills:</label>
                            <div className="Skills-container">
                                <input
                                    id='skills'
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onClick={() => setShowOptions(true)}
                                    placeholder="Add a skill"
                                    list="skillsChoices" // Connect the input to the datalist
                                />
                                {Skills.map((skill, index) => (
                                    <div key={index} className="skill-tag">
                                        {skill}
                                        <button onClick={() => handleDelete(skill)}>x</button>
                                    </div>
                                ))}
                                <datalist id="skillsChoices"> {/* Define the datalist */}
                                    {predefinedSkills.map((skill, index) => (
                                        <option key={index} value={skill} />
                                    ))}
                                </datalist>
                            </div>



                            <label htmlFor="deadline" style={{ textAlign: 'left', marginLeft: '20px' }}>Deadline:</label>
                            <input type="date" id="deadline" name="deadline" required />

                            <label htmlFor="budgetProject" style={{ textAlign: 'left', marginLeft: '20px' }}>Budget ($):</label>
                            <input type="number" id="budgetProject" name="budgetProject" required min="0" step="0.01" />


                            <button type="submit" onClick={submitProjectForm} style={{ marginRight: '10px' }}>Submit</button>
                            <button type="button" onClick={closeProjectForm}>Cancel</button>

                        </form>
                    </div>
                    {/* Form section */}
                    <div id="TrainingForm" className="Trainingform-container">
                        <form id="addTrainingForm">
                            <h1 style={{ textAlign: 'left', marginLeft: '20px', fontFamily: 'Fira Code, monospace', fontWeight: '700' }}>Add Training Request</h1>

                            <label htmlFor="domainTraining" style={{ textAlign: 'left', marginLeft: '20px', marginTop: '50px' }}>Domain:</label>
                            <select id="domainTraining" name="domainTraining" required>
                                <option value="">Select Domain</option>
                                <option value="Programming">Programming</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Software Development">Software Development</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Content Writing">Content Writing</option>
                                <option value="Project Management">Project Management</option>
                                <option value="Business Analysis">Business Analysis</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                            </select>

                            <label htmlFor="descriptionTraining" style={{ textAlign: 'left', marginLeft: '20px' }}>Description:</label>
                            <textarea id="descriptionTraining" name="descriptionTraining" required></textarea>

                            <br />
                            <br />
                            <br />
                            <button type="submit" onClick={submitTrainingForm} style={{ marginRight: '10px' }}>Submit</button>
                            <button type="button" onClick={closeTrainingForm}>Cancel</button>

                        </form>
                    </div>

                    {/* Post container */}
                    <div className="post-container">
                        {/* Merge all posts into one array */}
                        {[
                            ...TrainingPosts.map(post => ({ ...post, type: 'Training Request' })),
                            ...annonces.map(post => ({ ...post, type: 'Training Announcement' })),
                            ...posts.map(post => ({ ...post, type: 'Post' }))
                        ]
                            // Sort posts by dateCreation in ascending order
                            .sort((a, b) => new Date(a.dateCreation) - new Date(b.dateCreation))
                            .map((post, index) => {
                                const dateCreation = new Date(post.dateCreation);
                                const formattedDate = `${dateCreation.getDate()}/${dateCreation.getMonth() + 1}/${dateCreation.getFullYear()}`;
                                switch (post.type) {
                                    case 'Training Request':
                                        return (
                                            <div key={index} className="post">
                                                <a onClick={() => redirecttocardcl(post.idclient)}>
                                                    <h2>{post.auteur}</h2>
                                                </a>
                                                <h2>{formattedDate}</h2>
                                                <h2 className="custom3-h2">Training Request</h2>
                                                <div><strong>Domain:</strong> {post.domainTraining}</div>
                                                <p>Description: {post.descriptionTraining}</p>
                                                <div className="see-more">
                                                    <button type='button' onClick={() => toggleTrainingDetails(post)}>See More</button>
                                                </div>
                                            </div>
                                        );
                                    case 'Training Announcement':
                                        const startdate = new Date(post.startdate);
                                        const formattedStartdate = `${startdate.getDate()}/${startdate.getMonth() + 1}/${startdate.getFullYear()}`;
                                        const enddate = new Date(post.enddate);
                                        const formattedEnddate = `${enddate.getDate()}/${enddate.getMonth() + 1}/${enddate.getFullYear()}`;
                                        return (
                                            <div key={index} className="post">
                                                <a onClick={() => redirecttocardfo(post.idformateur)}>
                                                    <h2>{post.auteur}</h2>
                                                </a>
                                                <h2>{formattedDate}</h2>
                                                <h2 className="custom1-h2">Training</h2>
                                                <p>-Domain: {post.domain}</p>
                                                <p>-Start Date: {formattedStartdate}</p>
                                                <p>-End Date: {formattedEnddate}</p>
                                                <h6><strong>Price:</strong> {post.price}</h6>
                                                <div className="see-more">
                                                    <button type='button' onClick={() => toggleDetails2(post)}>See More</button>
                                                </div>
                                            </div>
                                        );
                                    case 'Post':
                                        return (
                                            <div key={index} className="post">
                                                <a onClick={() => redirecttocard(post.idfreelancer)}>
                                                    <h2>{post.auteur}</h2>
                                                </a>
                                                <h2>{formattedDate}</h2>
                                                <h2 className="custom2-h2">Working model</h2>
                                                <p>-Domain: {post.domain}</p>
                                                <p>-Activity: {post.activity}</p>
                                                <div className="see-more">
                                                    <button type='button' onClick={() => toggleDetails(post)}>See More</button>
                                                </div>
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                    </div>

                    {isBasketOpen && <BasketContainer />}

                    {/* Copyright section */}
                    <div id="copy" className="copyright-section text-center">
                        <p>&copy; 2024 Eya Eyouta. Tous droits réservés.</p>
                    </div>

                    {/* Details modal */}
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <h5>Description:</h5>
                                <p>{modalData.description}</p>

                                <h5>Files:</h5>
                                <p>{modalData.files}</p>
                                <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                                {showComments && (<Comment idpostfr={ispostchosen} />)}
                            </div>
                        </div>
                    )}
                    {showModal2 && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal2}>&times;</span>
                                <button className="signup-button" onClick={handleContinue}>Sign up</button>
                                <h5>Mode Delivery:</h5>
                                <p>{modalData.modedelivery}</p>
                                <h5>Description:</h5>
                                <p>{modalData.contenu}</p>
                                <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                                {showComments && (<Comment idannonce={ispostchosen} />)}
                            </div>
                        </div>
                    )}
                    {showModalTraining && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModalTraining}>&times;</span>
                                <h2>Domain:</h2>
                                <p>{modalDataTraining.domainTraining}</p>
                                <h2>Description:</h2>
                                <p>{modalDataTraining.descriptionTraining}</p>
                                <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                                {showComments && (<Comment idpostcl={ispostchosen} />)}
                            </div>
                        </div>
                    )}



                </section>
            </div>
        </div>
    );


}

export default AcceuilClient;