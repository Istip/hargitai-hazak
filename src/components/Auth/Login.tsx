import { useState } from 'react';

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
    console.log(formData);
    setFormData(initialState);
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
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
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
