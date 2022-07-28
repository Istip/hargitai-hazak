import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        background: '#f3f3f3',
        padding: '12px',
      }}
    >
      <div>
        <h3>LOGO</h3>
      </div>
      <div>
        <Link to="/">Home</Link>
        <span style={{ marginRight: '5px' }} />
        <Link to="/auth">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
