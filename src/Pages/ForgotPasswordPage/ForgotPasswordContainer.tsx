import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordPagePresentation from './ForgotPassworPagepresentation';

const ForgotPasswordPageContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    // 실제 비밀번호 찾기 API 연동 부분 (아래는 데모)
    setTimeout(() => {
      setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
      setIsLoading(false);
    }, 1000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <ForgotPasswordPagePresentation
      email={email}
      onEmailChange={handleEmailChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      message={message}
      onLoginClick={handleLoginClick}
    />
  );
};

export default ForgotPasswordPageContainer;
