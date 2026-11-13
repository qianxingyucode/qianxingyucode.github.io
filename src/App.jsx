import { projects } from './siteConfig';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Publications from './components/Publications';
import Experience from './components/Experience';
import Footer from './components/Footer';
import './App.css';
import "./css/Typography.css";
import News from "./components/News.jsx";
import Projects from "./components/Projects.jsx";
import AcademicBackground from "./components/AcademicBackground.jsx";

import './css/Personal.css';

function App() {
    return (
        <div className="App"><a className="skip-link" href="#about">Skip to content / 跳至正文</a>
            <Header />
            <div className="main-layout">
                <div className="left-hero">
                    <Hero />
                </div>
                <div className="right-content">
                    <div className="content-shell">
                        <About />
                        <News />
                        <Publications />
                        <Experience />
                        <AcademicBackground />
                        {projects.length > 0 && <Projects />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
