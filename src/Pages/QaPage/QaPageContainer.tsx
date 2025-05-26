import React, { useState, useMemo } from 'react';
import QaPagePresentation from './QaPagePresentation';

const dummyData = [
  {
    id: 1,
    title: '2024 자료구조 기말고사 예상문제',
    school: '서울대학교',
    subject: '자료구조',
    professor: '홍길동',
  },
  {
    id: 2,
    title: '2023 알고리즘 Q&A',
    school: '고려대학교',
    subject: '알고리즘',
    professor: '이순신',
  },
  {
    id: 3,
    title: '2022 컴퓨터구조 질문',
    school: '연세대학교',
    subject: '컴퓨터구조',
    professor: '김철수',
  },
  {
    id: 4,
    title: '2024 자료구조 Q&A',
    school: '서울대학교',
    subject: '자료구조',
    professor: '홍길동',
  },
];

const QaPageContainer: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [school, setSchool] = useState('');
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('');

  const filtered = useMemo(() => dummyData.filter(item =>
    item.title.includes(searchText) &&
    (school === '' || item.school === school) &&
    (subject === '' || item.subject === subject) &&
    (professor === '' || item.professor === professor)
  ), [searchText, school, subject, professor]);

  const schoolOptions = Array.from(new Set(dummyData.map(item => item.school)));
  const subjectOptions = Array.from(new Set(dummyData.map(item => item.subject)));
  const professorOptions = Array.from(new Set(dummyData.map(item => item.professor)));

  return (
    <QaPagePresentation
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
    />
  );
};

export default QaPageContainer;
