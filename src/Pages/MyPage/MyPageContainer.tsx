import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../AppContext';
import MyPagePresentation from './MyPagepresentation';

const MyPageContainer: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleGoMyPage = () => {
    navigate('/mypage');
  };

  const handleGoMain = () => {
    navigate('/landing');
  };

  // 추후 프로필/바로가기 등 실제 데이터는 props로 내려주면 됨
  return (
    <MyPagePresentation
      isAuthenticated={isAuthenticated}
      onLogin={handleLogin}
      onLogout={handleLogout}
      onRegister={handleRegister}
      onGoMyPage={handleGoMyPage}
      onGoMain={handleGoMain}
    />
  );
};

export default MyPageContainer;
