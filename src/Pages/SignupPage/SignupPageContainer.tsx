import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPagepresentation from './SignupPagepresentation';

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

    const formData = new FormData();
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            username,
            password,
            email
          })
        ],
        { type: "application/json" }
      )
    );

    try {
      setIsLoading(true);
      const response = await fetch('http://52.78.159.151:8080/api/members/signup', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        switch (result.statusMessage) {
          case "DUPLICATED_MEMBER":
            result.statusMessage = '동일한 아이디가 존재합니다.';
            break;
          case "DUPLICATED_EMAIL":
            result.statusMessage = '동일한 이메일이 존재합니다.';
            break;
          default:
        }
        throw new Error(result.statusMessage || '회원가입 실패');
      }
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
