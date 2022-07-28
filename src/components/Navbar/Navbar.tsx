import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAppSelector } from '../../hooks/reduxHooks';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };

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

        {user ? (
          <button onClick={handleLogout}>LOGOUT</button>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
