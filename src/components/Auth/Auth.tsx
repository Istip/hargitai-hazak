import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import Login from './Login';
import Register from './Register';

const Auth: React.FC = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  const onChange = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
  };

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {authType === 'login' ? <Login /> : <Register />}

      <br />
      <button onClick={onChange}>
        Change to {authType === 'login' ? 'Register' : 'Login'}
      </button>

      <br />
      <br />
      <hr />
      <br />
      <button onClick={handleGoogleAuth}>G | Continue</button>
    </div>
  );
};

export default Auth;
