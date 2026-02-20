import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import Counter from './pages/Counter';
import StudentDetails from './pages/StudentDetails';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/:id" element={<StudentDetails />} />
              <Route path="/add" element={<AddStudent />} />
              <Route path="/edit/:id" element={<EditStudent />} />
              <Route path="/counter" element={<Counter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
