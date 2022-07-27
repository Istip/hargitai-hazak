import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Home, Navbar, House, NotFound } from './components/';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/houses/:id" element={<House />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
