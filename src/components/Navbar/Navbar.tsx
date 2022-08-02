import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Box, Button, Flex, Text } from '../../UI/';

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
    <Flex
      p="10px 20px"
      justifyContent="space-between"
      alignItems="center"
      bg="primary800"
    >
      <Link to="/">
        <Text as="h3" fontWeight="black" color="primary500">
          Hargitai Hazak
        </Text>
      </Link>

      <Box>
        {user ? (
          <Button variant="primary" size="small" onClick={handleLogout}>
            LOGOUT
          </Button>
        ) : (
          <Link to="/auth">
            <Button variant="primary" size="small">
              LOGIN
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
