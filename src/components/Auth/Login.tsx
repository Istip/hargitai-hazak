import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';
import { Input } from '../../UI';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const initialState: FormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Singed in user: ', user);
        setFormData(initialState);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('An error occured: ', errorCode, errorMessage);
      });
  };

  return (
    <div>
      <h2>Login</h2>

      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Input
          placeholder="Enter email address..."
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          autoComplete="off"
        />
        <Input
          placeholder="Enter password..."
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
