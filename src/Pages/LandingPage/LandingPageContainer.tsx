import React, { useState, useEffect } from 'react';
import LandingPagePresentation from './LandingPagepresentation';
import { Item } from './LandingPagepresentation';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AppContext';
import { getAllProblemPosts, searchProblemPosts, ProblemPost } from '../../Apis/han/problemPostApi';

const LandingPageContainer: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]); // 전체 아이템 저장
  const [searchText, setSearchText] = useState('');
  const [school, setSchool] = useState('');
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('');
  const { isAuthenticated, logout } = useAuth();

  const fetchProblemPosts = async () => {
    try {
      const response = await getAllProblemPosts();
      if (response.success) {
        const transformedItems: Item[] = response.data.content.map((post: ProblemPost) => ({
          id: post.id,
          section: 'Section 30',
          title: post.title,
          school: post.school,
          subject: post.subject,
          professor: post.professorName
        }));
        setItems(transformedItems);
        setAllItems(transformedItems); // 전체 아이템 저장
      }
    } catch (error) {
      console.error('문제 게시글을 불러오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchProblemPosts();
  }, []);

  const handleSearch = async () => {
    try {
      const searchParams: any = {};
      if (searchText) searchParams.title = searchText;
      if (school) searchParams.school = school;
      if (subject) searchParams.subject = subject;
      if (professor) searchParams.professorName = professor;

      const response = await searchProblemPosts(searchParams);
      
      if (response.success) {
        const transformedItems: Item[] = response.data.content.map((post: ProblemPost) => ({
          id: post.id,
          section: 'Section 30',
          title: post.title,
          school: post.school,
          subject: post.subject,
          professor: post.professorName
        }));
        setItems(transformedItems);
      }
    } catch (error) {
      console.error('검색에 실패했습니다:', error);
    }
  };

  // 중복 없는 학교, 과목, 교수 목록 추출 (전체 데이터에서)
  const schoolOptions = Array.from(new Set(allItems.map(item => item.school)));
  const subjectOptions = Array.from(new Set(allItems.map(item => item.subject)));
  const professorOptions = Array.from(new Set(allItems.map(item => item.professor)));

  const handleLogout = () => {
    logout();
  };

  return (
    <LandingPagePresentation
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
      onLogout={handleLogout}
      currentPage="landing"
      onSearch={handleSearch}
      onUploadSuccess={fetchProblemPosts}
    />
  );
};

export default LandingPageContainer;