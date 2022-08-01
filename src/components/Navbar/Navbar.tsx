import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Box, Flex, Text } from '../../UI/';

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
      bg="primary200"
      borderColor="primary300"
    >
      <Link to="/">
        <Text as="h3" fontWeight="black" color="primary500">
          LOGO
        </Text>
      </Link>

      <Box>
        {user ? (
          <button onClick={handleLogout}>LOGOUT</button>
        ) : (
          <Link to="/auth">
            <Text color="primary900" fontWeight="bold">
              Login
            </Text>
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
