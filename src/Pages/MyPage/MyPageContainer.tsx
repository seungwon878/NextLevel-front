import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AppContext';
import MyPagePresentation from './MyPagepresentation';
import { fetchMyProfile, fetchTeamProjects, fetchTeamProjectDetail } from '../../Apis/gwon/api'; // fetchTeamProjectDetail 추가
import { getAllProblemPosts, getProblemPostById } from '../../Apis/han/problemPostApi';
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

  const [myTeamProjects, setMyTeamProjects] = useState<any[]>([]);
  const [showTeamProjects, setShowTeamProjects] = useState(false);
  const [teamProjectsLoading, setTeamProjectsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectDetailLoading, setProjectDetailLoading] = useState(false);

  const [myProblemPosts, setMyProblemPosts] = useState<any[]>([]);
  const [showProblemPosts, setShowProblemPosts] = useState(false);
  const [problemPostsLoading, setProblemPostsLoading] = useState(false);
  const [selectedProblemPost, setSelectedProblemPost] = useState<any>(null);
  const [problemPostDetailLoading, setProblemPostDetailLoading] = useState(false);

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
  }, [isAuthenticated]);
  
  const handleShowMyTeamProjects = async () => {
    if (!profile) return;
    setTeamProjectsLoading(true);
    setShowTeamProjects(true);
    setSelectedProject(null); // 상세 정보 초기화
    try {
      const projects = await fetchTeamProjects({ size: 100 });
      const filtered = projects.filter((item: any) => item.author === profile.username);
      setMyTeamProjects(filtered);
    } catch {
      setMyTeamProjects([]);
    } finally {
      setTeamProjectsLoading(false);
    }
  };

   const handleProjectClick = async (projectId: string | number) => {
    setProjectDetailLoading(true);
    try {
      const detail = await fetchTeamProjectDetail(projectId);
      setSelectedProject(detail);
    } catch (err) {
      console.error('상세 정보 불러오기 실패:', err);
      setSelectedProject(null);
    } finally {
      setProjectDetailLoading(false);
    }
  };

  const handleShowMyProblemPosts = async () => {
    if (!profile) return;
    setProblemPostsLoading(true);
    setShowProblemPosts(true);
    setSelectedProblemPost(null);
    setShowTeamProjects(false);
    setSelectedProject(null);
    
    try {
      const response = await getAllProblemPosts(0, 100); // 전체 목록 가져오기
      const filtered = response.data.content.filter((item: any) => item.author === profile.username);
      setMyProblemPosts(filtered);
    } catch {
      setMyProblemPosts([]);
    } finally {
      setProblemPostsLoading(false);
    }
  };

  const handleProblemPostClick = async (postId: number) => {
    setProblemPostDetailLoading(true);
    try {
      const detail = await getProblemPostById(postId);
      setSelectedProblemPost(detail);
    } catch (err) {
      console.error('문제 게시글 상세 정보 불러오기 실패:', err);
      setSelectedProblemPost(null);
    } finally {
      setProblemPostDetailLoading(false);
    }
  };

  const handleBackToProblemList = () => {
    setSelectedProblemPost(null);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

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
      onShowMyTeamProjects={handleShowMyTeamProjects}
      showTeamProjects={showTeamProjects}
      myTeamProjects={myTeamProjects}
      teamProjectsLoading={teamProjectsLoading}
      selectedProject={selectedProject}
      projectDetailLoading={projectDetailLoading}
      onProjectClick={handleProjectClick}
      onBackToList={handleBackToList}
      onShowMyProblemPosts={handleShowMyProblemPosts}
      showProblemPosts={showProblemPosts}
      myProblemPosts={myProblemPosts}
      problemPostsLoading={problemPostsLoading}
      selectedProblemPost={selectedProblemPost}
      problemPostDetailLoading={problemPostDetailLoading}
      onProblemPostClick={handleProblemPostClick}
      onBackToProblemList={handleBackToProblemList}
    />
  );
};

export default MyPageContainer;
