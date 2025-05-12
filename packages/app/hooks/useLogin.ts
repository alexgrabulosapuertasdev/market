import { useEffect, useState } from 'react';
import { getUserRole, login } from '../services/auth.service';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    getUserRole().then((userRole) => {
      setIsLogged(Boolean(userRole));
    });
  }, []);

  const handleLogin = async (onSuccess?: () => void) => {
    setIsSubmitted(true);
    if (!email || !password) {
      return;
    }

    await login({ email, password });

    const userRole = await getUserRole();

    setIsLogged(Boolean(userRole));

    setFinished(true);
    onSuccess?.();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isSubmitted,
    isLogged,
    finished,
  };
}
