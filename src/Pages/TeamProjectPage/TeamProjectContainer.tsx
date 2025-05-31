import React, { useState, useEffect } from 'react';
import TeamProjectPresentation from './TeamProjectPresentation';
import { Item } from './TeamProjectPresentation';
import { useAuth } from '../../AppContext';
import { fetchTeamProjects } from '../../Apis/gwon/api';

const TeamProjectContainer: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState('');
  const [school, setSchool] = useState('');
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, logout } = useAuth();

  // API에서 팀 프로젝트 목록 조회
  useEffect(() => {
    const loadData = async () => {
      try {
        const projects = await fetchTeamProjects(searchText);
        setItems(projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류 발생');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchText]);

  // 필터 옵션 추출 (API에서 학교/과목/교수 목록을 가져오는 것이 더 나음)
  const schoolOptions = Array.from(new Set(items.map(item => item.school)));
  const subjectOptions = Array.from(new Set(items.map(item => item.subject)));
  const professorOptions = Array.from(new Set(items.map(item => item.professor)));

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TeamProjectPresentation
      items={items}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      school={school}
      onSchoolChange={setSchool}
      subject={subject}
      onSubjectChange={setSubject}
      professor={professor}
      onProfessorChange={setProfessor}
      schoolOptions={schoolOptions}
      subjectOptions={subjectOptions}
      professorOptions={professorOptions}
      isAuthenticated={isAuthenticated}
      onLogout={logout}
    />
  );
};

export default TeamProjectContainer;
