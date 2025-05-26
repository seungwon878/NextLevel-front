import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AppContext';
import LoginPagePresentation from './LoginPagepresentation';

export interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPageContainer: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { login } = useAuth();

  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe') === 'true';
    const savedUsername = remembered ? localStorage.getItem('username') : '';
    setRemember(remembered);
    setUsername(savedUsername || '');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://52.78.159.151:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        switch (result.statusMessage) {
          case "NOT_FOUND":
            result.statusMessage = '존재하지 않는 아이디입니다.';
            break;
          case "BAD_CREDENTIALS":
            result.statusMessage = '아이디와 비밀번호가 일치하지 않습니다.';
            break;
          default:
        }
        throw new Error(result.statusMessage || '로그인 실패');
      }
      alert('로그인 성공!');
      if (remember) {
        localStorage.setItem('username', username);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('username');
        localStorage.setItem('rememberMe', 'false');
      }

      login();
      navigate('/landing');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleForgotPassword = () => {
    navigate('/forgot');
  };

  const handleRegister = () => {
    setPassword('');
    setTimeout(() => {
      navigate('/signup');
    }, 750);
  };

  return (
    <LoginPagePresentation
      username={username}
      password={password}
      remember={remember}
      error={error}
      isLoading={isLoading}
      formRef={formRef}
      onSubmit={handleSubmit}
      onUsernameChange={handleUsernameChange}
      onPasswordChange={handlePasswordChange}
      onRememberChange={handleRememberChange}
      onForgotPassword={handleForgotPassword}
      onRegister={handleRegister}
    />
  );
};

export default LoginPageContainer;
