import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupSuccessPresentation from './SignupSuccessPagepresentation';

const SignupSuccessContainer: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return <SignupSuccessPresentation onLoginClick={handleLoginClick} />;
};

export default SignupSuccessContainer;
