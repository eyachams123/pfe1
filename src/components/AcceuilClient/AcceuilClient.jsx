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

const AcceuilClient = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
    //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [ProjectPosts, setProjectPosts] = useState([]);
    const [modalDataProject, setModalDataProject] = useState(null);
    const [showModalProject, setShowModalProject] = useState(false);


    const [isTrainingFormOpen, setIsTrainingFormOpen] = useState(false);
    const [TrainingPosts, setTrainingPosts] = useState([]);
    const [modalDataTraining, setModalDataTraining] = useState(null);
    const [showModalTraining, setShowModalTraining] = useState(false);



    useEffect(() => {
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
            activityProject,
            domainProject,
            descriptionProject,
            budgetProject,
            deadline, // Include the deadline
            Skills: Skills
        };

        // Add the new post to the beginning of the ProjectPosts array
        setProjectPosts([newProjectPost, ...ProjectPosts]);

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
            domainTraining,
            descriptionTraining
        };

        // Add the new post to the beginning of the TrainingPosts array
        setTrainingPosts([newTrainingPost, ...TrainingPosts]);

        // Close the form and reset the form fields
        closeTrainingForm();
        //event.target.reset();
    };



    const toggleTrainingDetails = (post) => {
        setModalDataTraining({
            domainTraining: post.domainTraining,
            descriptionTraining: post.descriptionTraining,
        });
        setShowModalTraining(true);
    };


    const closeModalTraining = () => {
        setShowModalTraining(false);
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
                                    <a href="#">
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
                                <a href="#">
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


                    {/* Post container */}
                    <div className="post-container">
                        {ProjectPosts.map((post, index) => {
                            return (
                                <div key={index} className="post">
                                    <h2>{post.activityProject}</h2>
                                    <p>{post.descriptionProject}</p>
                                    <div><strong>Domain:</strong> {post.domainProject}</div>
                                    {post.Skills && (
                                        <div><strong>Skills:</strong> {post.Skills.join(', ')}</div>
                                    )}
                                    <h5><strong>Deadline:</strong> {post.deadline}</h5>
                                    <h5><strong>Budget:</strong> {post.budgetProject}</h5>
                                    <div className="see-more">
                                        <button type='button' onClick={() => toggleProjectDetails(post)}>See More</button>
                                    </div>
                                </div>
                            );
                        })}




                    </div>

                    {/* Load More button */}
                    <a href="#" className="myButton">Load More</a>

                    {/* Copyright section */}
                    <div id="copy" className="copyright-section text-center">
                        <p>&copy; 2024 Eya Eyouta. Tous droits réservés.</p>
                    </div>

                    {/* Details modal */}
                    {showModalProject && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModalProject}>&times;</span>
                                <h2>Title:</h2>
                                <p>{modalDataProject.titleProject}</p>
                                <h2>Domain:</h2>
                                <p>{modalDataProject.domainProject}</p>
                                <h2>Description:</h2>
                                <p>{modalDataProject.descriptionProject}</p>
                                <h2>Skills Needed:</h2>
                                <p>{modalDataProject.Skills}</p>
                                <h5>Budget:</h5>
                                <p>{modalDataProject.budgetProject}</p>
                            </div>
                        </div>
                    )}
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
                        {TrainingPosts.map((post, index) => {
                            //console.log(post);  // Check what each 'post' contains
                            return (
                                <div key={index} className="post">
                                    <div><strong>Domain:</strong> {post.domainTraining}</div>

                                    <p>{post.descriptionTraining}</p>
                                    <div className="see-more">
                                        <button type='button' onClick={() => toggleTrainingDetails(post)}>See More</button>
                                    </div>

                                </div>
                            );
                        })}



                    </div>


                    {/* Details modal */}
                    {showModalTraining && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModalTraining}>&times;</span>
                                <h2>Domain:</h2>
                                <p>{modalDataTraining.domainTraining}</p>
                                <h2>Description:</h2>
                                <p>{modalDataTraining.descriptionTraining}</p>

                            </div>
                        </div>
                    )}



                </section>
            </div>
        </div>
    );


}

export default AcceuilClient;