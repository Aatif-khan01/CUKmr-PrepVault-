import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';   // ← make sure this path is correct
import Navbar        from './components/Navbar';
import Footer        from './components/Footer';

import Home          from './pages/Home';
import Programs      from './pages/Programs';
import About         from './pages/About';
import Contact       from './pages/Contact';
import Contributors  from './pages/Contributors';
import Admin         from './pages/Admin';               // if Admin has nested routes, use "/admin/*"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/programs"    element={<Programs />} />
              <Route path="/about"       element={<About />} />
              <Route path="/contact"     element={<Contact />} />
              <Route path="/contributors" element={<Contributors />} />
              <Route path="/admin"       element={<Admin />} />
              {/* If Admin has its own nested routes, use <Route path="/admin/*" element={<Admin />} /> */}
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
