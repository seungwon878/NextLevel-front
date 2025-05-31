import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPagepresentation from './SignupPagepresentation';
import { signupApi } from '../../Apis/gwon/api';

const SignupPageContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !username || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!validateEmail(email)) {
      setError('이메일 형식이 잘못되었습니다.');
      return;
    }
    try {
      setIsLoading(true);
      await signupApi(email,username,password);
      navigate('/signupsuccess');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignupPagepresentation
      email={email}
      username={username}
      password={password}
      confirm={confirm}
      error={error}
      isLoading={isLoading}
      onEmailChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      onUsernameChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      onPasswordChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      onConfirmChange={(e: ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)}
      onSubmit={handleSubmit}
      onLoginClick={() => navigate('/login')}
    />
  );
};

export default SignupPageContainer;
