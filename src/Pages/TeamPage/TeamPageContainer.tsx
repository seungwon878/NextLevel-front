import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeamPagePresentation from './TeamPagePresentation';
import { useAuth } from '../../AppContext';
import { fetchTeamProjectDetail, TeamProjectDetail, updateTeamProject, deleteTeamProject } from '../../Apis/gwon/api';

const TeamPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<TeamProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, logout, username } = useAuth();
  const isAuthor = project?.author === username;

  const handleUpdate = async (updatedData: {
    title: string;
    content: string;
    department: string;
    school: string;
  }) => {
    const token = localStorage.getItem('token') || '';
    try {
      const updatedProject = await updateTeamProject(id!, { ...updatedData, token });
      setProject(updatedProject);
    } catch (err) {
      setError(err instanceof Error ? err.message : '수정 실패');
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token') || '';
    try {
      await deleteTeamProject(id!, token);
      navigate('/project');
    } catch (err) {
      setError(err instanceof Error ? err.message : '삭제 실패');
    }
  };
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await fetchTeamProjectDetail(id || '');
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>프로젝트를 찾을 수 없습니다</div>;

  return (
    <TeamPagePresentation
      title={project.title}
      school={project.school}
      department={project.department}
      author={project.author}
      content={project.content}
      createdAt={project.createdAt}
      updatedAt={project.updatedAt}
      isAuthor={isAuthor}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      isAuthenticated={isAuthenticated}
      onLogout={logout}
    />
  );
};

export default TeamPageContainer;
