import { useEffect, useState } from 'react';
import { login } from '../services/auth.service';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [token, setToken] = useState(undefined);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async (onSuccess?: () => void) => {
    setIsSubmitted(true);
    if (!email || !password) {
      return;
    }

    const data = await login({ email, password });

    setFinished(true);

    if (data?.token) {
      setToken(data.token);
      localStorage.setItem('jwt_token', data.token);
      onSuccess?.();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isSubmitted,
    token,
    finished,
  };
}
