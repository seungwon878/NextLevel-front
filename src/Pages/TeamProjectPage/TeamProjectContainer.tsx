import React, { useState, useEffect } from 'react';
import TeamProjectPresentation from './TeamProjectPresentation';
import { Item } from './TeamProjectPresentation';
import { useAuth } from '../../AppContext';
import { fetchTeamProjects } from '../../Apis/gwon/api';

const TeamProjectContainer: React.FC = () => {
  const [allItems, setAllItems] = useState<Item[]>([]); // 전체 데이터 저장
  const [items, setItems] = useState<Item[]>([]); // 필터링된 데이터
  const [pendingSearchText, setPendingSearchText] = useState('');
  const [pendingSchool, setPendingSchool] = useState('');
  const [pendingDepartment, setPendingDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, logout } = useAuth();

  // 초기 데이터 로드 (필터 없이 전체 데이터 가져오기)
  useEffect(() => {
    const loadData = async () => {
      try {
        const projects = await fetchTeamProjects({});
        setAllItems(projects);
        setItems(projects); // 초기에는 전체 데이터 표시
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류 발생');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 클라이언트 측 필터링 함수
  const handleSearch = () => {
    const filtered = allItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(pendingSearchText.toLowerCase()) ||
                           item.content.toLowerCase().includes(pendingSearchText.toLowerCase());
      const matchesSchool = pendingSchool ? item.school === pendingSchool : true;
      const matchesDepartment = pendingDepartment ? item.department === pendingDepartment : true;
      return matchesSearch && matchesSchool && matchesDepartment;
    });
    setItems(filtered);
  };

  // 옵션 추출
  const schoolOptions = Array.from(new Set(allItems.map(item => item.school)));
  const departmentOptions = Array.from(new Set(allItems.map(item => item.department)));

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TeamProjectPresentation
      items={items}
      searchText={pendingSearchText}
      onSearchTextChange={setPendingSearchText}
      school={pendingSchool}
      onSchoolChange={setPendingSchool}
      department={pendingDepartment}
      onDepartmentChange={setPendingDepartment}
      onSearch={handleSearch}
      schoolOptions={schoolOptions}
      departmentOptions={departmentOptions}
      isAuthenticated={isAuthenticated}
      onLogout={logout}
      currentPage="project"
    />
  );
};

export default TeamProjectContainer;
