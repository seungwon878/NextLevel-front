import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AppContext';
import MyPagePresentation from './MyPagepresentation';
import { fetchMyProfile } from '../../Apis/gwon/api';
import { useNavigate, Navigate } from 'react-router-dom';

interface Profile {
  username: string;
  email: string;
  role: string;
  profileImageUrl: string;
  content: string;
}

const MyPageContainer: React.FC = (props) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMyProfile(token)
      .then(data => setProfile(data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);
  
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

  return (
    <MyPagePresentation
      profile={profile}
      loading={loading}
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
