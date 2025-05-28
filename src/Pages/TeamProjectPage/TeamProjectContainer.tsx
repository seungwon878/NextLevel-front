import React, { useState, useEffect } from 'react';
import TeamProjectPresentation from './TeamProjectPresentation';
import { Item } from './TeamProjectPresentation';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AppContext';
//import { useAppContext } from "../../AppContext";

const dummyItems: Item[] = [
  {
    id: 1,
    title: '캡스톤 디자인 - AI 기반 학습 관리 시스템',
    school: '서울대학교',
    subject: '캡스톤 디자인',
    professor: '김영수'
  },
  {
    id: 2,
    title: '소프트웨어공학 - 대학생 커뮤니티 플랫폼',
    school: '연세대학교',
    subject: '소프트웨어공학',
    professor: '박민정'
  }
];

const TeamProjectContainer: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState('');
  const [school, setSchool] = useState('');
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('');
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // TODO: 실제 API 호출 로직으로 교체
    setItems(dummyItems);
  }, []);

  const filtered = items.filter(item =>
    item.title.includes(searchText) &&
    (school === '' || item.school === school) &&
    (subject === '' || item.subject === subject) &&
    (professor === '' || item.professor === professor)
  );

  // 중복 없는 학교, 과목, 교수 목록 추출
  const schoolOptions = Array.from(new Set(items.map(item => item.school)));
  const subjectOptions = Array.from(new Set(items.map(item => item.subject)));
  const professorOptions = Array.from(new Set(items.map(item => item.professor)));

  return (
    <TeamProjectPresentation
      items={filtered}
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