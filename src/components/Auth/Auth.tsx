import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth: React.FC = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  const onChange = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
  };

  return (
    <div>
      {authType === 'login' ? <Login /> : <Register />}
      <button onClick={onChange}>
        Change to {authType === 'login' ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default Auth;
