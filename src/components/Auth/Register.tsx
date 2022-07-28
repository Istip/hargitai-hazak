import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: React.FC = () => {
  const initialState: FormData = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [formData, setFormData] = useState(initialState);
  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return alert('Passwords do not match');
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        console.log('Registered user: ', user);
        setFormData(initialState);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error ocured: ', errorCode, errorMessage);
      });
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Enter your name..."
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <input
          placeholder="Enter email address..."
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          placeholder="Enter password..."
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <input
          placeholder="Confirm password..."
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={onChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;