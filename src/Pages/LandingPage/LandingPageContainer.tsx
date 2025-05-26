import React, { useState, useEffect } from 'react';
import LandingPagePresentation from './LandingPagepresentation';
import { Item } from './LandingPagepresentation';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AppContext';
//import { useAppContext } from "../../AppContext";

const dummyItems: Item[] = [
  {
    id: 1,
    section: 'Section 30',
    title: '2025 소프트웨어 공학 기말고사 문제(홍길동교수)',
    school: '서울대학교',
    subject: '소프트웨어 공학',
    professor: '홍길동'
  },
  {
    id: 2,
    section: 'Section 30',
    title: '2023 프로그래밍 언어 중간/기말 문제(이순신교수)',
    school: '고려대학교',
    subject: '프로그래밍 언어',
    professor: '이순신'
  },
  {
    id: 3,
    section: 'Section 30',
    title: '2020 경제학원론 기말고사 문제(김철수교수)',
    school: '연세대학교',
    subject: '경제학원론',
    professor: '김철수'
  },
];

const LandingPageContainer: React.FC = () => {
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
    <LandingPagePresentation
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

export default LandingPageContainer;