import React, { useState, useEffect } from 'react';
import './AcceuilFreelancer.css';
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
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Comment from '../cmt/CommentSection';


const AcceuilFreelancer = () => {
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [projets, setProjets] = useState([]);
    const [annonces, setAnnonces] = useState([]);

    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [formData, setFormData] = useState({
        activity: '',
        domain: '',
        contenu: '',
    });


    const [iduser, setiduser] = useState("");
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');
        const iduser = localStorage.getItem('id');

       
        setiduser(iduser)
        console.log(iduser);
        if (!token || usertype !== "Freelancer") {
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
                    const projetsResponse = await axios.get('http://localhost:5000/projetsclients', {
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
                    setProjets(projetsResponse.data);
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

    const [files, setFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles([...files, ...e.dataTransfer.files]);
    };

    const handleChange = (e) => {
        setFiles([...files, ...e.target.files]);
    };
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

    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        const form = document.getElementById("projectForm");

        form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
    };

    const closeForm = () => {
        document.getElementById("projectForm").style.display = "none";
        setIsFormOpen(false); // Also set isFormOpen state to false
    };

    const submitForm = (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        // Extract form data
        const activity = document.getElementById('activity').value;
        const domain = document.getElementById('domain').value;
        const description = document.getElementById('description').value;

        // Create a new post object
        const newPost = {
            activity,
            domain,
            description
        };

        const endpointURL = 'http://localhost:5000/createPoste/' + iduser;

        // Add the new post to the beginning of the posts array
        setPosts([newPost, ...posts]);

        // Send a POST request to the endpoint with the new post data
        axios.post(endpointURL, newPost)
            .then(response => {
                console.log('Post request successful:', response.data);
                // Handle successful response here if needed
            })
            .catch(error => {
                console.error('Error making post request:', error);
                // Handle error here if needed
            });

        // Close the form and reset the form fields
        closeForm();
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

    const toggleDetails = (post) => {
        setModalData({
            description: post.description,
            files: post.files
        });
        setShowModal(true);
    };
    const toggleDetails2 = (post) => {
        setModalData({
            contenu: post.contenu,
            modedelivery: post.modedelivery,
        });
        setShowModal2(true);
    };
    const toggleDetails3 = (post) => {
        setModalData({
            contenu: post.contenu,

        });
        setShowModal3(true);
    };
    const handleLogout = async () => {

        // Clear authentication data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('usertype');

        // Redirect to a specific location, such as '/'
        navigate('/');
    };
    const gotoprofile = async () => {

        navigate("/profilefreelancer");
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
    const closeModal3 = () => {
        setShowModal3(false);
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
                                    <a href="#" onClick={toggleForm}>
                                        <AddCircleIcon className='icon' />
                                        <span className="text nav-text">Add Project</span>
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
                {isFormOpen && (
                    <div className="form-container">
                        <form id="addProjectForm">
                            {/* Your form elements */}
                            <button type="submit" onClick={submitForm}>Submit</button>
                            <button type="button" onClick={closeForm}>Cancel</button>
                        </form>
                    </div>
                )}
                <section className="home">

                    <div className="top-buttons">

                        <button id="button1">Inspiration</button>
                        <button id="button2">Looking For Work</button>
                        <button id="button3">Learn</button>

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
                            and showcase your skills.<br /></p>
                    </div>
                    {/* Form section */}
                    <div id="projectForm" className="form-container">
                        <form id="addProjectForm">
                            <label htmlFor="activity">Activity:</label>
                            <input type="text" value={formData.activity} onChange={handleInputChange} id="activity" name="activity" required />

                            <label htmlFor="domain">Domain:</label>
                            <select value={formData.domain} onChange={handleInputChange} id="domain" name="domain" required>
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

                            <label htmlFor="description">Description:</label>
                            <textarea value={formData.description} onChange={handleInputChange} id="description" name="description" required></textarea>
                            <div>
                                <h3>Project Files </h3>
                                <p>You must add at least one file or video link to your project*</p>
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    style={{
                                        border: '2px dashed black',
                                        padding: '20px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Drag and drop or
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" style={{ color: 'blue', cursor: 'pointer' }}>
                                        browse files
                                    </label>
                                </div>
                                {files.length > 0 && (
                                    <ul>
                                        {Array.from(files).map((file, index) => (
                                            <h5 key={index}>{file.name}</h5>
                                        ))}
                                    </ul>
                                )}
                                <br />
                            </div>
                            <button type="submit" onClick={submitForm}>Submit</button>
                            <button type="button" onClick={closeForm}>Cancel</button>

                        </form>
                    </div>

                    {/* Post container */}
                    <div className="post-container">
                        {posts.map((post, index) => {
                            console.log(post);
                            const dateCreation = new Date(post.dateCreation);
                            const formattedDate = `${dateCreation.getDate()}/${dateCreation.getMonth() + 1}/${dateCreation.getFullYear()}`;

                            return (

                                <div key={index} className="post">

                                    <h2>{post.auteur}</h2>
                                    <h2>{formattedDate}</h2>

                                    <h2 className="custom2-h2">Working model</h2>
                                    <p>-Domain: {post.domain}</p>
                                    <p>-Activity:{post.activity}</p>

                                    <div className="see-more">
                                        <button type='button' onClick={() => toggleDetails(post)}>See More</button>
                                    </div>
                                </div>
                            );
                        })}

                        {annonces.map((post, index) => {
                            console.log(post);
                            const dateCreation = new Date(post.dateCreation);
                            const formattedDate = `${dateCreation.getDate()}/${dateCreation.getMonth() + 1}/${dateCreation.getFullYear()}`;
                            const startdate = new Date(post.startdate); // Corrected
                            const formattedStartdate = `${startdate.getDate()}/${startdate.getMonth() + 1}/${startdate.getFullYear()}`;
                            const enddate = new Date(post.enddate); // Corrected
                            const formattedEnddate = `${enddate.getDate()}/${enddate.getMonth() + 1}/${enddate.getFullYear()}`;

                            return (
                                <div key={index} className="post">
                                    <h2>{post.auteur}</h2>
                                    <h2>{formattedDate}</h2>

                                    <h2 className="custom1-h2">Formation</h2>
                                    <p>-Domain: {post.domain}</p>

                                    <p>-Start Date: {formattedStartdate}</p>
                                    <p>-End Date: {formattedEnddate}</p>
                                    <h6><strong>Price:</strong> {post.price}</h6>

                                    <div className="see-more">
                                        <button type='button' onClick={() => toggleDetails2(post)}>See More</button>
                                    </div>
                                </div>
                            );
                        })}

                        {projets.map((post, index) => {
                            console.log(post);
                            const deadline = new Date(post.Deadline);
                            const formattedDeadline = `${deadline.getDate()}/${deadline.getMonth() + 1}/${deadline.getFullYear()}`;
                            const dateCreation = new Date(post.dateCreation);
                            const formattedDate = `${dateCreation.getDate()}/${dateCreation.getMonth() + 1}/${dateCreation.getFullYear()}`;

                            return (

                                <div key={index} className="post">
                                    <h2>{post.auteur}</h2>
                                    <h2>{formattedDate}</h2>

                                    <h2 className="custom3-h2">Project request</h2>
                                    <p>-Domain:{post.domain}</p>
                                    <p>-Activity: {post.titre}</p>
                                    <p>-Skills: {post.Skills}</p>
                                    <p>-DeadLine: {formattedDeadline}</p>

                                    <h6><strong>Budget:</strong> {post.Budget}</h6>


                                    <div className="see-more">
                                        <button type='button' onClick={() => toggleDetails3(post)}>See More</button>
                                    </div>
                                </div>
                            );
                        })}

                    </div>



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
                                {showComments && (<Comment />)}
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
                                {showComments && (<Comment />)}

                            </div>
                        </div>
                    )}
                    {showModal3 && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal3}>&times;</span>
                                <button className="signup-button">Send Request</button>
                                <h5>Description:</h5>
                                <p>{modalData.contenu}</p>
                                <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                                {showComments && (<Comment />)}



                            </div>
                        </div>
                    )}

                </section>
            </div>
        </div>
    );


}

export default AcceuilFreelancer;