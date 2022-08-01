import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setUser } from '../../features/user/userSlice';
import { AiFillGoogleCircle } from 'react-icons/ai';
import Login from './Login';
import Register from './Register';
import { Box, Button, Flex, Text } from '../../UI';

const Auth: React.FC = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
  };

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (response) => {
        const user = response.user;
        const data = {
          uid: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          email: user.email,
          admin: false,
          createdAt: Date.now(),
          houses: 0,
        };
        const docRef = doc(db, 'users', user.uid);
        const merge = { merge: true };
        await setDoc(docRef, data, merge);

        dispatch(setUser(data));

        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Flex p={20} direction="column" gap={5}>
      {authType === 'login' ? <Login /> : <Register />}

      <Flex m="5px 0 0">
        <Box h={1} bg="primary200" m={'10px 20px'} w="100%" />
        <Box>
          <Text size="sm" color="primary400">
            OR
          </Text>
        </Box>
        <Box h={1} bg="primary200" m={'10px 20px'} w="100%" />
      </Flex>

      <Box m="10px 0">
        <Button
          onClick={handleGoogleAuth}
          // variant="primary"
          justifyContent="center"
          icon={<AiFillGoogleCircle size={16} />}
          w="100%"
        >
          Authenticate with Google
        </Button>
      </Box>

      <Box>
        <Button
          onClick={onChange}
          variant="secondary"
          justifyContent="center"
          w="100%"
        >
          Change to {authType === 'login' ? 'Register' : 'Login'}
        </Button>
      </Box>
    </Flex>
  );
};

export default Auth;
