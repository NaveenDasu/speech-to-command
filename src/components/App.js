import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';

const commandPageMap = {
  home: Home,
  contact: Contact
};

function App() {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    navigate(transcript);
  };

  const navigate = (command) => {
    const page = commandPageMap[command.toLowerCase()];
    if (page) {
      // Redirect to the corresponding route
      setListening(false);
      window.location.href = `/${command.toLowerCase()}`;
    }
  };

  return (
    <div>
      <h1>Speech Navigation</h1>
      <Router>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/blog/new">Add Blog Post</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
      {listening ? (
        <button onClick={() => setListening(false)}>Stop Listening</button>
      ) : (
        <button onClick={startListening}>Start Listening</button>
      )}
    </div>
  );
}

export default App;
