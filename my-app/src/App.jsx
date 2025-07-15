import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'aos/dist/aos.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import RegistrationForm from './Components/RegisterationForm/RegisterationForm';
import Dashboard from './Components/Dashboard/Dashboard';


function App() {
  return (
    <div className="page-with-bg">
      <Navbar/>
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/registrationForm" element={<RegistrationForm />} />

        <Route path="/dashboard/:id" element={<RegistrationForm />} />
        
      </Routes>

    </div>
  );
}

export default App;
