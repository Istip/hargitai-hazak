import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Box, Text } from '../../UI/';

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
      <Link to="/">
        <Text as="h3" fontWeight="black" color="primary.500">
          LOGO
        </Text>
      </Link>

      <Box>
        {user ? (
          <button onClick={handleLogout}>LOGOUT</button>
        ) : (
          <Link to="/auth">Login</Link>
        )}

        <Box>
          <Text as="h3" fontWeight="black" color="primary.500">
            HELLOKA
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;
