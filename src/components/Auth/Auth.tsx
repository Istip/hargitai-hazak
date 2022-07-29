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
      <button
        onClick={handleGoogleAuth}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '10px 20px',
        }}
      >
        <AiFillGoogleCircle size={24} /> Continue
      </button>
    </div>
  );
};

export default Auth;
