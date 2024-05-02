import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Skills.css';
import Background from '../Background/Background';

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
  "Language Translation", "Cybersecurity", "Blockchain", "Internet of Things (IoT)", "Keyword Research",
  " On-Page Optimization",
  "Off-Page Optimization",
  " Technical SEO",
  "Content Strategy",

  "SEO Audits",

  "SEO Copywriting",
  " Mobile SEO Optimization",
  "E-commerce SEO"

];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    populateSkillOptions();
  }, []);

  const populateSkillOptions = () => {
    const skillsChoices = document.getElementById("skillsChoices");
    skillsChoices.innerHTML = "";

    predefinedSkills.forEach((skill) => {
      const option = document.createElement("option");
      option.value = skill;
      skillsChoices.appendChild(option);
    });
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue && predefinedSkills.includes(inputValue)) {
      setSkills(prevSkills => [...prevSkills, inputValue]);
    }
  };

  const handleFormSubmit = () => {
    const formData = {
      name: searchParams.get('name'),
      email: searchParams.get('email'),
      password: searchParams.get('password'),
      role: searchParams.get('role'),
      job: searchParams.get('job'),
      jobDescription: searchParams.get('jobDescription'),
      journey: searchParams.get('journey'),
      phoneNumber: searchParams.get('phoneNumber'),
      address: searchParams.get('address'),
      selectedLanguages: searchParams.get('selectedLanguages') ? searchParams.get('selectedLanguages').split(",") : [],
      skills: skills.join(',')
    };
    console.log(formData);
    if (formData.role === "trainer") {
      const queryParams = new URLSearchParams(formData).toString();
      navigate(`/interests?${queryParams}`);
    }
    else {
      const queryParams = new URLSearchParams(formData).toString();
      navigate(`/languages?${queryParams}`);
    }

  };
  console.log(skills);
  return (
    <div className="Skills">
      <Background />
      <div className="container">
        <div className="input-container">
          <label htmlFor="skillsInput" className="label">What are your skills?</label>
          <input
            type="text"
            id="skillsInput"
            list="skillsChoices"
            className="input-skills"
            onChange={handleInputChange}
          />
          <datalist id="skillsChoices"></datalist>
          <div className="selected-skills">
            {skills.map((skill, index) => (
              <div key={index} className="selected-skill">
                <span>{skill}</span>
                <FontAwesomeIcon icon={faTimes} className="close-btn" onClick={() => removeSkill(skill)} />
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button className='btn' onClick={() => window.history.back()}>Previous</button>
          <button className='btn' onClick={handleFormSubmit}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
