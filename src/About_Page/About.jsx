import './About.css';
import { useEffect, useState, useCallback } from 'react';
import { usePlayerContext } from '../contexts/PlayerContext';
import portraitImg from '../assets/portrait.webp';
import displayBoardImg from '../assets/display_board.png';
import aboutImg from '../assets/about_me.png';
import aboutAction from '../assets/about_me_action.gif';
import projectsImg from '../assets/projects.png';
import projectsAction from '../assets/projects_action.png';
import experienceImg from '../assets/experience.png';
import experienceAction from '../assets/experience_action.png';
import rmcLogo from '../assets/rmc_logo.jpeg';
import aposysLogo from '../assets/aposys_logo.jpeg';

function AboutIcon({ img, action, label, posClass, targetX, targetY, onOpen }) {
  const { position } = usePlayerContext();
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (position?.x == null || position?.y == null) return;

    // Correct for screen aspect ratio so detection remains circular
    const aspect = window.innerWidth / (window.innerHeight || 1);
    const dx = (position.x - targetX) * aspect;
    const dy = position.y - targetY;
    const dist = Math.hypot(dx, dy);

    // Expanded interaction thresholds
    const ENTER_DIST = 14.0;
    const EXIT_DIST = 18.0;

    setNear((prev) => (prev ? dist <= EXIT_DIST : dist <= ENTER_DIST));
  }, [position, targetX, targetY]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (near && (e.code === 'Space' || e.key === 'Enter')) {
        e.preventDefault();
        onOpen(label);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [near, label, onOpen]);

  return (
    <article 
      className={`about-puck ${posClass} ${near ? 'about-puck--active' : ''}`}
      onClick={() => onOpen(label)}
    >
      <img 
        src={near ? action : img} 
        alt={label} 
        className="about-puck__img" 
        draggable={false}
      />
      <span className="about-puck__label">{label}</span>
      {near && <span className="about-puck__prompt">[SPACE / CLICK]</span>}
    </article>
  );
}

export default function About() {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpen = useCallback((label) => {
    setActiveModal(label);
  }, []);

  const handleClose = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="about-page" aria-labelledby="about-heading">
      {/* Header Title Banner */}
      <div className="about-header-banner">
        <h1 className="about-header-title">My Journey and Projects</h1>
        <p className="about-header-subtitle">Skate to any image and interact to view details</p>
      </div>

      <div className="about-stage">
        <AboutIcon 
          img={aboutImg} 
          action={aboutAction} 
          label="About Me" 
          posClass="about-me" 
          targetX={75} 
          targetY={25} 
          onOpen={handleOpen} 
        />
        <AboutIcon 
          img={projectsImg} 
          action={projectsAction} 
          label="Projects" 
          posClass="projects" 
          targetX={25} 
          targetY={25} 
          onOpen={handleOpen} 
        />
        <AboutIcon 
          img={experienceImg} 
          action={experienceAction} 
          label="Experience" 
          posClass="experience" 
          targetX={50} 
          targetY={70} 
          onOpen={handleOpen} 
        />
      </div>

      {activeModal && (
        <div className="display-overlay" onClick={handleClose}>
          <div className="display-board-wrapper" onClick={(e) => e.stopPropagation()}>
            <img src={displayBoardImg} alt="Display Board" className="display-board-img" />
            
            {/* Top Right Close Button */}
            <button className="display-board-close" onClick={handleClose} aria-label="Close">✕</button>

            {/* Inner Parchment Scroll Area */}
            <div className="display-board-content">
              {activeModal === 'About Me' && (
                <div className="board-about-container">
                  <h3 className="board-about-heading">
                    Hi! I'm Andy, a 3rd year computer science student at Queen's University specializing in mathematics and statistics.
                  </h3>

                  <div className="board-about-body">
                    <div className="board-about-text">
                      <p>
                        I enjoy exploring practical AI solutions to address some of the worlds biggest challenges. In particular,
                        my current research focuses on advancing machine learning techniques for time-series forecasting. I have developed 
                        deep neural networks for machine learning pipelines, and worked on various projects involving embedded systems.
                      </p>
                      <p> 
                        I'm very passionate about research, and I am currently working to publish my work on a novel time series forecasting machine learning architecture.
                        I'm always looking forward to exploring more opportunities to learn and address real-world problems with innovative solutions.
                      </p>
                    </div>

                    <div className="board-about-portrait-wrapper">
                      <img 
                        src={portraitImg} 
                        alt="Andy Luo portrait" 
                        className="board-about-portrait" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'Projects' && (
                <div className="board-projects-list">
                  <a 
                    href="https://qdaa.github.io/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card"
                  >
                    <h3 className="project-title">Queen's Data Analytics Association</h3>
                    <p className="project-tools">Python, Pandas, Numpy</p>
                    <div className="project-desc">
                      <ul>
                        <li>Analyzed multi-sensor rocket datasets using Python, designing automated data cleaning workflows to eliminate outliers.</li>
                        <li>Developed quantitative summaries and data visualizations, finalized in a report detailing findings and trends</li>
                      </ul>
                    </div>
                  </a>

                  <a 
                    href="https://autodrive.engineering.queensu.ca/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card"
                  >
                    <h3 className="project-title">Queen's Autodrive Perception Team</h3>
                    <p className="project-tools">ROS2, Python, C++</p>
                    <div className="project-desc">
                      <ul>
                        <li>Engineered LiDAR perception pipelines using ROS 2, implementing ground removal algorithms and point-cloud clustering to detect and track surrounding obstacles in real-time drive scenarios.</li>
                        <li>Designed local path planning and obstacle-avoidance vector space integrated with vehicle state estimation to generate path planning under dynamic road constraints.</li>
                      </ul>
                    </div>
                  </a>

                  <a 
                    href="https://github.com/owang06/ethicalmousetrap" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card"
                  >
                    <h3 className="project-title">Smart Home Ethical Mouse Extraction</h3>
                    <p className="project-tools">React, Python, Arduino, C++</p>
                    <div className="project-desc">
                      <ul>
                        <li>Built a React web application enabling users to monitor trap status, receive real-time catch notifications, and view telemetry data</li>
                        <li>Programmed an Arduino-based robotic vehicle with motor drivers and directional sensors for automated exploration and safe retrieval</li>
                        <li>Designed a low-latency communication layer using Python & WebSockets to stream live sensory data and send remote control commands to the hardware controller.</li>
                      </ul>
                    </div>
                  </a>

                  <a 
                    href="https://github.com/Andyluo6136/ScreamStream" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card"
                  >
                    <h3 className="project-title">Gesture & Voice Video Controller</h3>
                    <p className="project-tools">Python, OpenCV, MediaPipe</p>
                    <div className="project-desc">
                      <ul>
                        <li>Implemented real-time head pose tracking using MediaPipe Face Mesh in Python to map directional head tilts to video handling.</li>
                        <li>Built a bidirectional WebSocket bridge between the Python backend and web frontend for ultra-low latency event streaming.</li>
                        <li>Integrated the browser's Web Audio API to dynamically scale video volume proportional to microphone input amplitude.</li>
                      </ul>
                    </div>
                  </a>
                </div>
              )}

              {activeModal === 'Experience' && (
                <div className="board-projects-list">
                  <a 
                    href="https://www.rmc-cmr.ca/en/mathematics-and-computer-science/department-mathematics-and-computer-science" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card experience-card"
                  >                  
                    <div className="experience-card__body">
                      <h3 className="project-title">Royal Military College of Canada (Undergraduate Student Researcher)</h3>
                      <p className="project-tools">Python, PyTorch, TCN, SLURM, Bash</p>
                      <div className="project-desc">
                        <ul>
                          <li>Awarded a highly competitive NSERC Undergraduate Student Research Award (USRA) valued at $10,000+ to conduct full-time laboratory research.</li>
                          <li>Developed a Temporal Convolutional Neural Network (TCN) machine learning pipeline to predict disturbances in Earth’s magnetic field caused by solar storms.</li>
                          <li>Streamlined parallel GPU workflows on NVIDIA H100 clusters leveraging SLURM workload manager and Bash scripting to scale model training.</li>
                          <li>Engineered a custom loss function for time-series forecasting addressing asymmetric loss and late-prediction penalties, currently co-authored for publication.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="experience-card__logo-wrapper">
                      <img src={rmcLogo} alt="Royal Military College Logo" className="experience-card__logo" />
                    </div>
                  </a>

                  <a 
                    href="https://aposystech.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card experience-card"
                  >
                    <div className="experience-card__body">
                      <h3 className="project-title">ApoSys Technologies Inc. (Embedded Systems Intern)</h3>
                      <p className="project-tools">ROS2, Python, C++, GPS, IMU, Radar</p>
                      <div className="project-desc">
                        <ul>
                          <li>Engineered a ROS2-based collision avoidance system for rail and road vehicles by fusing GPS, IMU, and Radar data.</li>
                          <li>Developed an operational prototype capable of obtaining highly accurate, real-time localization and environmental perception.</li>
                          <li>Secured future funding by conducting a live demonstration of the functional system on a hi-rail truck for stakeholders at Hudson's Bay Railway.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="experience-card__logo-wrapper">
                      <img src={aposysLogo} alt="ApoSys Technologies Logo" className="experience-card__logo" />
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Bottom Scroll Title */}
            <div className="display-board-banner-title">
              <h2>{activeModal}</h2>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}